/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('token')? localStorage.getItem('token'): prompt('Введите токен Яндекс диска:');
    if (token) {
      localStorage.setItem('token', token);
    }
    return token;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    console.log(url)
    console.log(encodeURIComponent(url))
    createRequest(`${this.HOST}/resources/upload/?path=${encodeURIComponent(path)}&url=${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: {'Authorization': `OAuth ${this.getToken()}`},
    }, callback);
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    createRequest(`${this.HOST}/resources/?path=${path}`, {
      method: 'DELETE',
      headers: {'Authorization': `OAuth ${this.getToken()}`},
    }, callback);

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest(`${this.HOST}/resources/files`, {
      method: 'GET',
      headers: {'Authorization': `OAuth ${this.getToken()}`},
    }, callback);
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let a = document.createElement('a');
    a.href = url;
    a.click();
  }
}

// disk:/Море.jpg
