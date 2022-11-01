//series = funcion de gulp que permite ejecutar multiples tareas al mismo tiempo

const { src, dest, watch, series } = require('gulp'); //src=  identificar un archivo   dest = almacenar un archivo

//compilar CSS
const sass = require('gulp-sass')(require('sass')); //este sass esta importanto el paquete sass
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//imagenes
const imagemin = require('gulp-imagemin'); //se encarga de alijerar las imagenes

function css(done) {

    src('src/scss/app.scss') //paso 1.identificar el archivo principal
        .pipe(sass()) //2. compilar SASS
        .pipe(dest('build/css')) //3. exportarlo o guardarlo en una ubicación
    done(); //callback
}
//funcion para que haga los cambios? scss a css
function dev(done) {
    //watch('src/scss/app.scss', css); //archivo tiene que ejecutar por cambios y , css que funcion tieene que ejecutar cuando esos cambios sucedan 
    watch('src/scss/**/*.scss', css); // * para que todos los archivos que esten dentro de la carpeta scss sean detectados cambios
    watch('src/img/**/*', )
    done();
}

//metodo para optimizar nuestras imagenes
function imagenes(done) {
    src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img')) //donde lo va a guardar
    done();
}

//para hacer un archivo css mas compacto
function cssbuild(done) {
    src('build/css/app.css') //identificar el archivo que vamos a compactar el scss
        .pipe(rename({ //
            suffix: '.min' //nombre que se le va a agregar el archivo   app.min.css
        }))
        .pipe(purgecss({ //para eliminar el css que no ocupemos
            content: ['index.html', 'base.html', 'blog.html', 'entrada.html', 'nosotros.html', 'producto.html', 'tienda.html'] //sem pueden agragar mas ejem 'nosotros.html'
        }))
        .pipe(dest('build/css'))
    done();
}

exports.css = css;
exports.dev = dev; //en consola gulp dev
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev); //en consola solo gulp
exports.build = series(cssbuild); //gulp build