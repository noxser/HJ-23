const addClass = ( className, context ) => context.classList.add( className ),
	    removeClass = ( className, context ) => context.classList.remove( className ),
      hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
	constructor( container ) {
  	this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
    	left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    this.positionsContainer.addEventListener( 'dragover', this.showTargetZone.bind( this ) );
    this.positionsContainer.addEventListener( 'dragleave', this.hideTargetZone.bind( this ) );
    this.positionsContainer.addEventListener( 'drop', this.loadFile.bind( this ) );
    this.actionButton.addEventListener( 'click', this.takeResult.bind( this ) );
  }
  loadFile( event ) {
    event.preventDefault();
    this.hideTargetZone();
    // регуляркой проверяем тип файла
    let imageTypeRegExp = /^image\//;
    let files = Array.from( event.dataTransfer.files );
    if ( imageTypeRegExp.test( files[0].type )){
      event.target.textContent = ''
      // передаем целевой элемент для следующей функции и изображение
      this.insertImg( files[0], event.target )
      this.result.textContent = ''
    } else {
      this.result.textContent =  'Это не картинка!';
    }
  }
  // получаем объект фаил, и целевой обект над которым произошло событие дроп
  insertImg( file, targetEl ) {
    event.preventDefault();
    if ( hasClass( 'layout__image', targetEl )) {
      targetEl.src = URL.createObjectURL(file);
    } else {
      let img = document.createElement( 'img' );
      img.src = URL.createObjectURL( file );
      img.className = 'layout__image';
      targetEl.appendChild( img );
    }
  }
  takeResult() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imagesForCollage = this.positionsContainer.querySelectorAll('.layout__item')
    canvas.width = this.positionsContainer.offsetWidth;
    canvas.height = this.positionsContainer.offsetHeight;
    // грузим изображения в canvas по очереди
    Array.from(imagesForCollage).forEach(el => {
        // формируем координаты для drawImage
        let boundEl = el.parentElement.getBoundingClientRect()
        let x =  Math.abs( Math.round( el.offsetLeft - boundEl.left) )
        let y =   Math.abs( Math.round( el.offsetTop - boundEl.top) )
        // пустое изображение
        let img = new Image()
        img.src = el.querySelector('img').src
        // маштабируем  картинки
        ctx.drawImage( img, x, y, el.offsetWidth, el.offsetWidth * img.height / img.width );
    });
    this.result.innerText = `<img  src="${canvas.toDataURL()}" alt="iLayout">`;
  }
  showTargetZone() {
    event.preventDefault()
    addClass( 'layout__item_active', event.target );
  }
  hideTargetZone() {
    event.preventDefault()
    removeClass( 'layout__item_active', event.target );
  }
}

new iLayout( document.getElementById( 'layout' ));

