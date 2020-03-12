  //Deshabilitar los botones de slick ----------------------------------------------------------------
  $('#slick_mapa').on('init', function(event, slick){
    
    //Disable slick buttons
    $('.slick-dots li button').on('click', function(e){
      e.stopPropagation(); // use this
    });
    
  });

  //Igualar tamaños de las cajas .---------------------------------------------------------------------

  //Snippet para igualar el tamaño de las cajas
  let = v_maximo = 0;  
  window.onresize = function(event) {
    $('.card_content').css('min-height', 'auto');  
    //console.log('resize');
    igualar_tamaño();
  };
    
  function igualar_tamaño(){    
    for(let i = 0; i < $('.card_content').length; i++){
      if(v_maximo < $('.card_content').eq(i).innerHeight() ){
          v_maximo = $('.card_content').eq(i).innerHeight() ;
      }
    }
    $('.card_content').css('min-height', v_maximo + 'px');  
    //console.log(v_maximo)
  }  
  setTimeout(function(){
  igualar_tamaño();
  },500)
  
  //Snippet para igualar el tamaño de las cajas
  //
  $('#tarjetas_profesores').on('init', function(event, slick){
    igualar_tamaño();
  });


  
  /*Tarjetas Expandibles-------------------------------------------------------------------------*/
    
  let item = $('.grow_up');
  let interno = $('.interno');
  
  interno.each(function(i){
    if(($('.interno').eq(i).offset().top) < ($(window).scrollTop() + innerHeight*.9)){
      $(this).addClass('active');
    }
  })
  
  item.each(function(i){      
    if($('.grow_up').eq(i).offset().top < ($(window).scrollTop() + window.innerHeight*.5) &&
       ($('.grow_up').eq(i).offset().top+window.innerHeight*.2)  > $(window).scrollTop()  ){          
      if(!$(this).hasClass('active')){
        $(this).addClass('active')        
      }
    }else{
      if($(this).hasClass('active')){
        $(this).removeClass('active')
      }       
    }      
  });
/*Tarjetas Expandibles-------------------------------------------------------------------------*/



//Items flotantes -------------------------------------------------------------------------------

let lastScroll;
let plus = 0;
//necesario para el flotante

$(window).scroll(function(){
    
    /*Numeros Flotantes*/
    var st = window.pageYOffset || document.documentElement.scrollTop;
      
     $('span.title_counter').css('transform', 'translateY('+ plus +'vw)');    
      
        if(lastScroll > window.scrollY){
          if(plus <= 4){
            plus += 0.1;
          }              
        }else{
          if(plus >= -4){
            plus -= 0.1;
          }
        }
      lastScroll = st <= 0 ? 0 : st;
      //Elementos flotantes
      
      
      //Personas flotantes, cierre
      if($('.personas_s>img').position().top < ($(window).scrollTop() - innerHeight)){
        $('.personas_s>img').css('transform', 'translateY('+ plus +'vw)');    
      }
      
      
});
  







//Generar titulos automaticos ------------------------------------------------------------------------
$(window).load(function(){  
    let titulo = $('.title_box h2'), subtitulo = $('.title_box h4') , titulo_id = $('.title_box');
    let counter = $('.title_box .title_counter');
    let titulos = [], titulos_id = [], subtitulos = [];
    let i, n, id, html, sub;
    
    for(i = 0; i < counter.length; i++){
      n = i+1;
      counter.eq(i).html(n)
      titulo_id.eq(i).attr('id', 'title_'+n)
    }
    
    for(i = 0; i < titulo.length; i++){   
      html = titulo.eq(i).html();
        titulos.push(html);
      
      //sub = subtitulo.eq(i).html();
      //subtitulos.push(sub);
      
      id = titulo_id.eq(i).attr('id');
        titulos_id.push(id);
    }
  
    for(i = 0; i < titulos.length; i++){
      n = i+1;
        $('.index').append("<a href='#"+ titulos_id[i] +"' class='white index_content'><h3>" + n + "</h3><h4><strong>" + titulos[i] + "</strong></h4></a>")                      
    }  	
    
  });





//Generar active en cada item al bajar --------------------------------------------------------------

$(document).ready(function(){
    
    //Crear un item final para validar
    let last_title = '<div class="title_box"></div>';
    $('body').append(last_title);
    $(window).scroll(function(){
      let titulo = $('.title_box');
      
      titulo.each(function(i){
        if(titulo.eq(i).offset().top-(innerHeight*0.7) < window.scrollY &&
          titulo.eq(i+1).offset().top-(innerHeight*0.7) > window.scrollY
          ){
          
          $('.barra.index .index_content').removeClass('active');
          $('.barra.index .index_content').eq(i).addClass('active')
         
           }
      });
      
    });
      
});


//Scroll horizontal
  /*Dragable*/
  var curDown = false,
  curYPos = 0,
  curXPos = 0;
$('#b').mousemove(function(m){
if(curDown === true){
 //$('#b').scrollTop($('#b').scrollTop() + (curYPos - m.pageY)); 
 $('#b').scrollLeft($('#b').scrollLeft() + (curXPos - m.pageX)*.1);
}
});

$('#b').mousedown(function(m){
curDown = true;
curYPos = m.pageY;
curXPos = m.pageX;
});

$('#b').mouseup(function(){
curDown = false;
});
//Dragable



    //Validar todos los checkbox
    $('.input_checkbox').change(val_checkbox);

    function val_checkbox(){
        if($(this).prop('checked')){
            $(this).parent().addClass('active');
        }else{
            $(this).parent().removeClass('active');
        }
    }

    //Mostrar contraseña en desktop
    $('#show_pass').mousedown(function(){
        $(this).siblings('input').prop('type', 'text');
    });
    $('#show_pass').mouseup(function(){
        $(this).siblings('input').prop('type', 'password');
    });

    $('.toggle_modal').click(function(){
        $('#'+ $(this).data().target).fadeIn().css('display', 'flex');
    });

    //Cerrar todos los modales
    $(window).click(function(e){
        if(!e.target.matches('.toggle_modal') 
        && !e.target.matches('.toggle_modal *')
        && !e.target.matches('.modal_box_container')
        && !e.target.matches(".modal_box_container *:not(.close_item_modal)")){
            $('.modal_bg_box').fadeOut();
        }
    });


    //Validar campos de formularios
    $('.val_inputs').click(val_register_input);


    function val_register_input(){
        $('input').each(function(){
            if($(this).val().length < 2 || !$(this).prop('checked')){
                $(this).parent().addClass('error')
            }
        });
        
        $('select').each(function(){
            if(!$(this).is(':selected')){
                $(this).parent().addClass('error')
            }
        });
    };

    //Validar valor de los inputs
    $('input').keyup(val_input);
    $('input').change(val_input);

    function val_input(){
        if($(this).val().length > 2){
            $(this).parent().removeClass('error')
        }
    }
    //Validar los selects
    $('select').change(function(){
        $(this).parent().removeClass('error');
    })
//Validar limite de campos para inputs numericos y de telefonos
$('input[type="number"]').keyup(val_max_number);
$('input[type="number"]').change(val_max_number);
$('input[type="tel"]').keyup(val_max_number);
$('input[type="tel"]').change(val_max_number);

function val_max_number(){
    if($(this).val().length > $(this).prop('maxlength')){
        $(this).val($(this).val().substr(0, $(this).val().length -1))
    }
}

//Valida inputs de radio
$('input[type=radio]').change(function(){
    if($(this).prop('checked')){
        $('input[name='+$(this).prop('name')+']').parent().removeClass('active');
        $(this).parent().addClass('active');
        $(this).parent().parent().parent().removeClass('error');
    }
});

//Limpiar campos de formularios
$('.limpiar_campos').click(function(){
    $('input').val('');
    $('select').val('');
});



    //vali url

    const url_is_valid = (url) => {

        if(url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)){
            return true;
        }

    }

    //valid url




if($(window).width() <= 768){  
    //Mostrar contraseña en telefono      
    $('#show_pass').click(function(){
        $('#password').prop('type', 'text');
    });   
}


//Hubspot mostrar blogs
  <div class="lista_blogs_recomendados">
    {% set rec_posts = blog_recent_posts('default', 3) %}
    {% for rec_post in rec_posts %}
        <div class="post_item">
          <a href="{{ rec_post.absolute_url }}">
          <div class="pi_img" style="background-image: url({{ rec_post.featured_image }})"> </div>
          </a>
          <div class="pi_content">
            <div class="pi_date_tag helve">
              <p class="f16 gris">
                {{rec_post.publish_date|datetimeformat('%d . %m . %Y')}}
              </p>
              <p class="f16 gris">
                {% if rec_post.topic_list %}
                {% for topic in rec_post.topic_list %} 
                {% if loop.index <=1 %} 
                <a href="{{ blog_tag_url(group.id, topic.slug) }}" class="tag__name">{{ topic.name }}</a>{% if not loop.last %} {% endif %} 
                {% endif %} 
                {% endfor %} {% endif %}
              </p>
            </div>
          <a href="{{ rec_post.absolute_url }}">
            <h5 class="bold margin_0">
              {{ rec_post.name }}
            </h5>
          </a>
          <a class="blue bold read_more_link" href="{{ rec_post.absolute_url }}">LEER MÁS ></a>
          </div>
        </div>
    {% endfor %}
    {#
    {% for i in module.posts %}
    <div class="post_item">
      <a href="{{i.enlace.url.href}}">
      <div class="pi_img" style="background-image: url({{i.imagen.src}})"> </div>
      </a>
      <div class="pi_content">
        <div class="pi_date_tag helve">
          <p class="f16 gris">
            {{i.date}}
          </p>
          <p class="f16 gris">
            {{i.tag}}
          </p>
        </div>
      <a href="{{i.enlace.url.href}}">
        <h5 class="bold margin_0">
          {{i.titulo}}
        </h5>
      </a>
      <a class="blue bold read_more_link" href="{{i.enlace.url.href}}">LEER MÁS ></a>
      </div>
    </div>
    {% endfor %}
    
#}


Counter-------------------------------------
    $('.count-this').each(function () {
    
	// Start the counting from a specified number - in this case, 0!
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
      }, {
        // Speed of counter in ms, default animation style
          duration: 2000,
          easing: 'swing',
          step: function (now) {
            // Round up the number
              $(this).text(Math.ceil(now));
          }
      });
    });
     
     
$('.hs_cos_wrapper_type_form').on('hsvalidatedsubmit', '.hs-form', function (e) {
    //analytics code goes here
});
     
     window.addEventListener('DOMContentLoaded', ()=>{

		let deploy_item_holder  = document.querySelectorAll('.desplegable_item');
    let default_height = document.querySelector('.ldesp_titulo').offsetHeight;
  
		deploy_item_holder.forEach((e)=>{
		  e.querySelector('.ldesp_titulo').onclick = ()=>{
			var active = e.classList.contains('active') ? true : false;
			deploy_item_holder.forEach((k)=>{
				k.classList.remove('active');
				k.style.maxHeight = default_height + 'px';
			});
			if(active){
			  e.classList.remove('active');
			  e.style.maxHeight = default_height + 'px';
			}else{
			  e.classList.add('active');
			  e.style.maxHeight = (e.querySelector('.ldesp_contenido').offsetHeight + default_height) +'px';
			};
		  };
		});
  
});
     
     // -------------------------- FORM HUBSPOPT AND AWAIT ELEMENT
     window.addEventListener('DOMContentLoaded', ()=>{
  
  const SEARCH_DELAY = 500;
  function waitForElementToBeAdded(cssSelector) {
      return new Promise((resolve) => {
          const interval = setInterval(() => {
              if (element = document.querySelector(cssSelector)) {
                  clearInterval(interval);
                  resolve(element);
              }
          }, SEARCH_DELAY);
      });
  }

  async function start_wait_form_hubspot() {
    var show_form = await waitForElementToBeAdded(".hs-form");     
    
    let inputs = document.querySelectorAll('.general_form input:not([name=hs_context]):not([type=submit])');       
    let select = document.querySelectorAll('.general_form select');

    
    checking_submit();
    
    inputs.forEach((e)=>{
      
      if(e.value != ""){
        e.parentElement.parentElement.classList.add('active');
        e.classList.add('validated');
      }
      
      if(e.type == 'checkbox' || e.type == 'radio'){
        if(e.checked){
            e.parentElement.classList.add('active');          
        }
        e.addEventListener('change', ()=>{
          checking_submit();
          console.log('change')
          if(e.checked){
            e.parentElement.classList.add('active');
          }else{
            e.parentElement.classList.remove('active');
          }        
        })
      }else{          
        e.addEventListener('change', checking_submit);
        e.addEventListener('keyup', checking_submit);
        e.addEventListener('keydown', checking_submit);
        
        e.addEventListener('focus',  ()=>{
          checking_submit();
          e.closest(".hs-form-field").classList.add('active');
        });
        e.addEventListener('focusout',  ()=>{
          checking_submit();
          if(e.value == ''){
            e.closest(".hs-form-field").classList.remove('active');
            e.classList.remove('validated')
          }      
          if(e.value != '' && !e.classList.contains('error')){
            e.classList.add('validated')
          }
        });
      }
    });

    select.forEach((e)=>{
      
      if(e.value != ""){
        e.parentElement.parentElement.classList.add('active');
      }
      e.addEventListener('change', ()=>{
        checking_submit();
        if(e.value != ''){
          e.closest(".hs-form-field").classList.add('active');
        }else{
          e.closest(".hs-form-field").classList.remove('active');
        }        
      });
    });
  
    function checking_submit(){    
      let input_submit = document.querySelectorAll('input[type=submit]');

      input_submit.forEach(e=>{
        var this_inputs = e.closest('form').querySelectorAll('input:not([type=submit]):not([type=radio]):not([type=checkbox]), select');
        var terminos = e.closest('form').querySelectorAll('input[type=radio], input[type=checkbox]');
        var this_valid = 0;

        terminos.forEach(k=>{
          if(k.checked){

          }else{
            this_valid ++;
          }
        });
        this_inputs.forEach(k=>{
          if(k.value != '' && !k.classList.contains('error')){

          }else{
            this_valid ++;
          }
        });

        console.log(this_valid);
        if(this_valid != 0){
          e.classList.remove('active');
        }else{
          e.classList.add('active');        
        }

      });
    }
    
  }
  start_wait_form_hubspot();

  
});
     
     //hubspot form//
     
        {%
            form
            form_to_use="{{module.form.form_id}}"
            response_response_type="{{module.form.response_type}}"
            response_message="{{module.form.response_message}}"
            response_redirect_id="{{module.form.redirect_id}}"
            response_redirect_url="{{module.form.redirect_url}}"
            follow_up_type_simple='{{ module.follow_up_type_simple }}',
            follow_up_type_automation='{{ module.follow_up_type_automation }}',
          %} 

{%- macro slugify(text) -%}

  {%- set output = text %}
  {%- set output = output | string | lower -%}
  {%- set output = output | regex_replace("[\t\n\f\r ]", "-") -%}   {# replace spaces with - #}
  {%- set output = output | regex_replace("[^0-9A-Za-z_-]", "") -%} {# remove all non-word characters #}
  {%- set output = output | regex_replace("-+", "-") -%}            {# replace multiple - with single - #}
  {%- set output = output | regex_replace("^[-]", "") -%}           {# trim - from start of text #}
  {%- set output = output | regex_replace("[-]$", "") -%}           {# trim - from end of text #}

  {{- output -}}

{%- endmacro -%}
