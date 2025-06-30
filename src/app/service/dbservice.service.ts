import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController} from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Jarra } from './jarra';
import { Like } from './like';


@Injectable({
  providedIn: 'root'
})

export class DbserviceService {

  public database!: SQLiteObject;

  tablaUsuarios: string = `CREATE TABLE IF NOT EXISTS usuarios (
                          id INTEGER PRIMARY KEY AUTOINCREMENT, 
                          firstname VARCHAR(30), 
                          lastname VARCHAR(30), 
                          password VARCHAR(255) NOT NULL, 
                          username VARCHAR(20) UNIQUE NOT NULL, 
                          fechaNacimiento DATE, 
                          nivelEducacion VARCHAR(20)
                          );`;
  tablaJarras: string = `CREATE TABLE IF NOT EXISTS jarras (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          nombre VARCHAR(30) NOT NULL,
                          tipo_punta VARCHAR(20) NOT NULL,
                          img TEXT NOT NULL,
                          descripcion TEXT NOT NULL
                          );`;

  tablaLikes: string = `CREATE TABLE IF NOT EXISTS likes (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          usuario_id INTEGER NOT NULL,
                          jarra_id INTEGER NOT NULL,
                          FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
                          FOREIGN KEY (jarra_id) REFERENCES jarras(id) ON DELETE CASCADE,
                          UNIQUE (usuario_id, jarra_id)
                        );`;

  private usuarioActivo = new BehaviorSubject<Usuario | null>(null);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController
  ) { 
    this.crearDB();
  }

  //Ya que la app no está pensada para que se creen jarras, entonces hay que plantar los datos desde un inicio
  //Para ello usaremos una seed de datos iniciales 

  async seedData(){
    try{
      const countResult = await this.database.executeSql('SELECT COUNT(*) as count FROM jarras', []);
      const count = countResult.rows.item(0).count;

      if (count === 0) {
        this.presentToast("Sembrando datos iniciales en la tabla jarras");

        const initialJarras = [
        {
          nombre: 'Jarra fineMax v1',
          tipo_punta: 'Punta fina',
          img: 'assets/img/fine_1.avif',
          descripcion: 'La jarra fineMax v1 es ideal para aquellos que buscan precisión en sus diseños de latte art. Con su punta fina, permite crear detalles intrincados y líneas delicadas, perfectas para rosetas y cisnes con plumas definidas.'
        },
        {
          nombre: 'Jarra fineMax v2',
          tipo_punta: 'Punta fina',
          img: 'assets/img/fine_2.avif',
          descripcion: 'La jarra fineMax v2 es una versión mejorada de la fineMax v1, con una punta aún más precisa. Ideal para artistas del latte que buscan llevar sus creaciones al siguiente nivel.'
        },
        {
          nombre: 'Jarra fineMax v3',
          tipo_punta: 'Punta fina',
          img: 'assets/img/fine_3.avif',
          descripcion: 'La jarra fineMax v3 es la opción definitiva para los amantes del latte art. Con su punta ultra fina, permite crear diseños extremadamente detallados y complejos.'
        },
        {
          nombre: 'Jarra roundedPro v1',
          tipo_punta: 'Punta redonda',
          img: 'assets/img/rounder_1.avif',
          descripcion: 'La jarra roundedPro v1 es perfecta para aquellos que buscan un flujo de leche más amplio. Ideal para corazones y tulipanes, su diseño permite una mayor versatilidad en el arte del latte.'
        },
        {
          nombre: 'Jarra roundedPro v2',
          tipo_punta: 'Punta redonda',
          img: 'assets/img/rounder_2.avif',
          descripcion: 'La jarra roundedPro v2 es una versión mejorada de la roundedPro v1, con un diseño ergonómico que facilita el vertido y permite crear diseños más grandes y audaces.'
        },
        {
          nombre: 'Jarra roundedPro v3',
          tipo_punta: 'Punta redonda',
          img: 'assets/img/rounder_3.avif',
          descripcion: 'La jarra roundedPro v3 es la opción ideal para los baristas que buscan un equilibrio perfecto entre precisión y versatilidad. Su punta redonda permite crear una amplia variedad de diseños con facilidad.'
        }
      ];

      for (const jarra of initialJarras) {
        await this.addJarra(jarra as Jarra, false);
      }
      this.presentToast("Datos iniciales sembrados correctamente en la tabla jarras");
    }
  }catch (e) {
      this.presentToast("Error al sembrar los datos iniciales: " + e);
    }
  };

  getUsuarioActivo(): Observable<Usuario | null> {
    return this.usuarioActivo.asObservable();
  }

  setUsuarioActivo(usuario: Usuario) {
    this.usuarioActivo.next(usuario);  
  }


  //CRUD
  // CREATE

  async addUsuario(usuario: Usuario) {
    
    let sql = `INSERT INTO usuarios (firstname, lastname, password, username, fechaNacimiento, nivelEducacion) 
               VALUES (?, ?, ?, ?, ?, ?)`;
    let data = [usuario.firstname, 
                usuario.lastname, 
                usuario.password, 
                usuario.username, 
                usuario.fechaNacimiento, 
                usuario.nivelEducacion];

    try {
      const res = await this.database.executeSql(sql, data);
      this.presentToast("Usuario añadido correctamente");
    }catch (e) {
      this.presentToast("Error al añadir el usuario: " + e);
    }
  };

  async addJarra(jarra: Jarra, showToast: boolean = true) {
    
    let sql = `INSERT INTO jarras (nombre, tipo_punta, img, descripcion) 
               VALUES (?, ?, ?, ?)`;
    let data = [jarra.nombre, 
                jarra.tipo_punta, 
                jarra.img, 
                jarra.descripcion];
    try {
      const res = await this.database.executeSql(sql, data);
      if (showToast) {
        this.presentToast("Jarra añadida correctamente");
      }
    }catch (e) {
      if (showToast) {
        this.presentToast("Error al añadir la jarra: " + e);
      }else {
        console.error("Error al añadir la jarra: ", e);
      }
      throw e;
    }
  };

  async addLike(like: Like) {
    
    let sql = `INSERT INTO likes (usuario_id, jarra_id) 
               VALUES (?, ?)`;
    let data = [like.usuario_id, 
                like.jarra_id];

    try {
      const res = await this.database.executeSql(sql, data);
      this.presentToast("Like añadido correctamente");
    }catch (e) {
      this.presentToast("Error al añadir el like: " + e);
    }
  };

  // READ

  async getUsuarios(){
    let sql = `SELECT * FROM usuarios`;
    let usuario: Usuario[] = [];
    try {
      const res = await this.database.executeSql(sql, []);
      for (let i = 0; i < res.rows.length; i++) {
        let item = res.rows.item(i);
        usuario.push(new Usuario(item.firstname, item.lastname, item.username, item.password, item.fechaNacimiento, item.nivelEducacion, item.id));
      }
      return usuario;
    } catch (e) {
      this.presentToast("Error al obtener los usuarios: " + e);
      return [];
    }
  }

  async getUsuarioByUsuario (username: string){
    let sql = `SELECT * FROM usuarios WHERE username = ?`;
    try{
      const res = await this.database.executeSql(sql, [username]);
      if(res.rows.length > 0){
        let item = res.rows.item(0);
        return new Usuario(item.firstname, item.lastname, item.username, item.password, item.fechaNacimiento, item.nivelEducacion, item.id);
        }
      return null;
    } catch (e:any) {
      this.presentToast("Error al obtener el usuario: " + e.message);
      return null;
    }
  }



  async getJarras(){
    let sql = `SELECT * FROM jarras`;
    let jarras: Jarra[] = [];
    try {
      const res = await this.database.executeSql(sql, []);
      for (let i = 0; i < res.rows.length; i++) {
        let item = res.rows.item(i);
        jarras.push(new Jarra(item.nombre, item.tipo_punta, item.img, item.descripcion, item.id));
      }
      return jarras;
    } catch (e) {
      this.presentToast("Error al obtener las jarras: " + e);
      return [];
    }
  }

  async getJarraById(id: number){
    let sql = `SELECT * FROM jarras WHERE id = ?;`
    try{
      const res = await this.database.executeSql(sql, [id]);
      if(res.rows.length > 0){
        let item = res.rows.item(0);
        return new Jarra(item.nombre, item.tipo_punta, item.img, item.descripcion, item.id);
      }
      return null;
    }catch(e:any) {
      this.presentToast("Error al obtener la jarra: " + e.message);
      return null;

    }
  }


  async getLikes(){
    let sql = `SELECT * FROM likes`;
    let likes: Like[] = [];
    try {
      const res = await this.database.executeSql(sql, []);
      for (let i = 0; i < res.rows.length; i++) {
        let item = res.rows.item(i);
        likes.push(new Like(item.usuario_id, item.jarra_id, item.id));
      }
      return likes;
    } catch (e) {
      this.presentToast("Error al obtener los likes: " + e);
      return [];
    }
  }

  async getLikesByUsuarioId(usuario_id: number){
    let sql = `SELECT * FROM likes WHERE usuario_id = ?`;
    try{
      const res = await this.database.executeSql(sql, [usuario_id]);
      for (let i = 0; i < res.rows.length; i++) {
        let item = res.rows.item(i);
        return new Like(item.usuario_id, item.jarra_id, item.id);
      }
      return null;
    }catch(e:any) {
      this.presentToast("Error al obtener los likes: " + e.message);
      return null;

    }
  }
  
  // UPDATE

  async updateUsuario(usuario: Usuario) {
    let sql = `UPDATE usuarios SET firstname = ?, lastname = ?, password = ?, username = ?, fechaNacimiento = ?, nivelEducacion = ? WHERE id = ?`;
    let data = [usuario.firstname, 
                usuario.lastname, 
                usuario.password, 
                usuario.username, 
                usuario.fechaNacimiento, 
                usuario.nivelEducacion, 
                usuario.id
                ];
    return this.database.executeSql(sql, data).then(res => {
      this.presentToast("Usuario actualizado correctamente");
    });
  }

  async updateJarra(jarra: Jarra) {
    let sql = `UPDATE jarras SET descripcion = ?, tipo_punta = ?, img = ?, nombre = ? WHERE id = ?`;
    let data = [jarra.descripcion,
                jarra.tipo_punta, 
                jarra.img, 
                jarra.nombre, 
                jarra.id
                ];
    return this.database.executeSql(sql, data).then(res => {
      this.presentToast("Jarra actualizado correctamente");
    });
  }

  async updateLike(like: Like) {
    let sql = `UPDATE likes SET usuario_id = ?, jarra_id = ? WHERE id = ?`;
    let data = [like.usuario_id, 
                like.jarra_id, 
                like.id
                ];
    return this.database.executeSql(sql, data).then(res => {
      this.presentToast("Usuario actualizado correctamente");
    });
  }

  // DELETE

  async deleteUsuario(id: number){
    let sql = `DELETE FROM usuarios WHERE id = ?`
    return this.database.executeSql(sql, [id]).then(res => {
      this.presentToast("Usuario eliminado correctamente");
    }).then(res => {
      this.presentToast("Error al eliminar el usuario");
    });
  }

  async deleteJarra(id: number){
    let sql = `DELETE FROM jarras WHERE id = ?`
    return this.database.executeSql(sql, [id]).then(res => {
      this.presentToast("Jarra eliminado correctamente");
    }).then(res => {
      this.presentToast("Error al eliminar el usuario");
    });
  }

    async deleteLike(jarra_id: number){
    let sql = `DELETE FROM likes WHERE jarra_id = ?`
    return this.database.executeSql(sql, [jarra_id]).then(res => {
      this.presentToast("Like eliminado correctamente");
    }).then(res => {
      this.presentToast("Error al eliminar el usuario");
    });
  }

  // Observable para saber si la base de datos está lista

  dbState(){
    return this.isDbReady.asObservable();
  }

  crearDB(){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'coffeejug.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada correctamente");
        //como dice la guia, "llamamos a la creacion de tablas"
        this.crearTablas();
      }).catch(e => {this.presentToast("Error al crear la BD: " + e.message)});
      })
  }

  async crearTablas(){
    try{
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaJarras, []);
      await this.database.executeSql(this.tablaLikes, []);
      this.presentToast("Tablas creadas correctamente");

      await this.seedData(); // Sembrar datos iniciales en la tabla jarras
      this.presentToast("Datos iniciales sembrados correctamente");

      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("Error al crear la tabla usuario: " + e);
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }
}
