const prop = ( data, name ) => data.map( item => item[ name ] ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );
class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );

    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];

    this.imagesCount = 0;

    this.registerEvents();
  }
  registerEvents() {
    this.uploadButton.addEventListener('change', () => this.onSelectFiles.call(this, event));
    this.submitButton.addEventListener('click', () => this.createAll.call(this, event));
  }
  onSelectFiles() {
    let imageTypeRegExp = /^image\//;
    Array.from( event.currentTarget.files ).forEach( image => {
      if ( imageTypeRegExp.test( image.type )) {
          let img = document.createElement('img');
          img.src = URL.createObjectURL( image );
          img.setAttribute('name', image.name)
          this.images.push( img )
          this.imagesCount += 1;
      }
    })
    this.imagesCountContainer.textContent = this.imagesCount;
  }
  createAll() {
    var cssText = `.icon {
  display: inline-block;
  background-image: url(img/sprite.png);
}`
    if ( this.images.length != 0 ) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.takeWidth();
    canvas.height = this.takeHeigth();
    // старт вставки картинок
    let x = 0
    let y = 0;
    // грузим изображения в canvas по очереди и создаем CSS
    Array.from( this.images ).forEach( function( image, indx ) {
      // формируем координаты для drawImage
      let img = new Image()
      img.src = image.src
      ctx.drawImage( img, x, y, image.width, image.height );
      // убираем расширение
      let name = image.name.replace( /(\.[^/.]+)+$/, "" ) 
      let iconParam =`
.icon_${name} {
  background-position: ${x}px 0;
  width: ${image.width}px;
  height: ${image.height}px;
}`
      cssText = cssText + iconParam;
      x += image.width;
    });
    this.imageElement.src = canvas.toDataURL();
    this.codeContainer.textContent = cssText;
    }
  }
  takeWidth() {
    return summ( prop( this.images, 'width' ));
    // return summ( this.images.map(( img ) => img.width ));
  }
  takeHeigth() {
    // пока только по самому большому делаем канвас
    return Math.max(...prop( this.images, 'height' )); 
    // return Math.max.apply( null, this.images.map(( img ) => Number( img.height )));
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));

