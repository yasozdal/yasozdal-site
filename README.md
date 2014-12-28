# СВОД ЗАКОНОВ
- Создание новых экземпляров моделей и представлений только в контроллере! 
(Mediator pattern)
- Все HTML шаблоны имеют строго один дочерний элемент. Может это и избыточно, 
но сделано для быстроты и удобства фреймворка. А это соглашение вдобавок 
позволяет полностью управлять всеми жлементами DOM, не вылавливая случайные
div'ы. (На самом деле у CollectionView и CompositeView рендеринг все еще 
стандартный и его стоит переопределить).
- Модели следует максимально инкапсулировать от всего видимого и осязаемого.
В частности, перенаправление по страницам не должно происходить в моделях.

# ПРО КЕШ:
Это очень тяжелая задача... Поэтому стоит ее отложить. Но, скорее всего, нужно 
будет использовать модели HTTP Last-Modified и ETag.

# ПРО ФАЙЛОВУЮ СТРУКТУРУ:
Каждая папка представлет из себя собственный модуль. Если одному модулю
требуются ресурсы из другого, то это повод задуматься о выделении нового
модуля или перемещении ресурса в commons. Проблемы ФС на данный момент:
- Сам факт существования layout. Его стоит разбить на отдельные модули.

# ТРЕШ:
- MVVM может стоит того?
- БЭМ - плохо, shadow DOM - хорошо.

# БУГУРТ:
- Libsass полное говно. Eсли ты работаешь под Win, значит ты нигер, тебе такая 
роскошь недоступна, сиди и играй в косынку. После того, как ты поебешься с 
cygwin, попробуешь mingw и msysgit ты поймешь, что под Win тебе не суждено 
собрать SASSC. Когда наконец ты решишь скачать скомпиленную версию, ты поймешь, 
что в сети ее нету. А когда найдешь ее, обрастешь бородой и со счастливыми 
глазами будешь пытаться прикрутить ее к своей IDE. Но тут твои приключения не 
заканчиваются! Любая версия скомпиленная под Win будет багованной, как вся твоя 
жизнь. Все, конец, устанавливаем Ruby, потому что ебал я все эти эксперименты... 
Хотя и тут придется попариться. НИЧЕГО не будет работать, пока вы запускаете IDE 
не от имени Администратора. И да, Ruby порт тормозной.

# ПЛАН:
- Странички для неавторизованных пользователей
- Pushstate
- Список событий
  - При появлении нового события, подсвечивать его в ленте
  - Что происходит с коллекцией после очистки списка?
  - Указать на карте
- Страничка события
  - Дизайн для мобильных устройств и для сайта (концепция диалога)
- Создание события
  - Загрузка фотографий
- Настройки
  - Загрузка аватара
- Где правильно вызывать fetch?
- Вынести в ресурсы
  - Дефолтный аватар пользователя
  - Изображения маркеров
- Нормально настроить SignalR
- Добавление события
  - Полоска готовности