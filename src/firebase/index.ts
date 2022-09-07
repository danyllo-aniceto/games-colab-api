import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'dotenv/config'

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
  // measurementId: process.env.measurementId
})

const name_app = process.env.name_app || 'Games'
const folder_app = process.env.folder_app || 'games'

class StorageService {
  storageRef = firebase.app().storage().ref()

  async subirImagen(nombre: string, arquivo: Express.Multer.File) {
    try {
      const encoded = arquivo.buffer.toString('base64')
      const base64 = `data:${arquivo.mimetype};base64,${encoded}`
      let respuesta = await this.storageRef
        .child(`${folder_app}/${nombre}`)
        .putString(base64, 'data_url')
      return await respuesta.ref.getDownloadURL()
    } catch (err: any) {
      console.log(err.message || 'Falha ao enviar imagem para o Firebase')
      return null
    }
  }

  async removerImagem(urlImage: string) {
    const name_organization = `${name_app}_`
    const start = urlImage.indexOf(name_organization) + name_organization.length
    const dataImg = urlImage.substring(start, start + 13)

    try {
      await this.storageRef
        .child(`${folder_app}/${name_organization}${dataImg}`)
        .delete()
    } catch (err: any) {
      console.log(err.message || 'Falha ao deletar imagem do Firebase')
    }
  }

  async visualizarImagem(nameFile: string) {
    try {
      return await this.storageRef
        .child(`${folder_app}/${nameFile}`)
        .getDownloadURL()
    } catch (err: any) {
      console.log(err.message || 'Falha ao visualizar imagem do Firebase')
      return null
    }
  }
}

export { StorageService }
