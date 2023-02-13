/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    let script = document.createElement('script')
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`
    document.getElementsByTagName("body")[0].appendChild(script)
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.querySelector('body').lastElementChild.remove();
    if (result['error'] == undefined) {
      let imgList = result.response.items
      let urlList = [];
      imgList.forEach(element => {
          let bigsize = element['sizes'][element['sizes'].length - 1]['url'];
          if (bigsize) {
            urlList.push(bigsize);
            }
        });
        this.lastCallback(urlList);
    } else {
        alert('Ошибка :' + result['error']['error_code'] + '-' + result['error']['error_msg']);
    }
    this.lastCallback = () => {};
  };
}

// https://oauth.vk.com/blank.html#access_token=vk1.a.K4nmk7vrdTf2nXobLsBOhD-p4B8nqePS-86gNVFBcCGYcnxtHc3bpSGJLdhFv1L9GmlgUZivC9QyftYqCdFC9cQFX_kppBoY42YuTFf_cl8tO80ZKAL1OnCMK4O0ruOJ-L6t0ChEVJlXfmE7e5S-uAlzn3Dv3-Jan6XF6LAILADA0iMOe9KivQHKVxOdI9XQPsPk06OyFXmT0Or7tjdlgA&expires_in=86400&user_id=737580348&state=123456
// vk1.a.K4nmk7vrdTf2nXobLsBOhD-p4B8nqePS-86gNVFBcCGYcnxtHc3bpSGJLdhFv1L9GmlgUZivC9QyftYqCdFC9cQFX_kppBoY42YuTFf_cl8tO80ZKAL1OnCMK4O0ruOJ-L6t0ChEVJlXfmE7e5S-uAlzn3Dv3-Jan6XF6LAILADA0iMOe9KivQHKVxOdI9XQPsPk06OyFXmT0Or7tjdlgA
// Это идентификатор вашего приложения. Используйте его в запросах для получения OAuth-токена
// dc5649ea0e4b468893939b35aa7eee12

// Секретный ключ, которым будет подписан jwt-токен с информацией о пользователе
// f6024a0332f544fe80a0c5ab11cd6f76




