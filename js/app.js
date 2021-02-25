document.querySelector('.logo-principal').addEventListener('click',function(){
  window.open("index.html","_self")})
document.querySelector('.yearact').textContent=new Date().getFullYear()
const cantProducts=document.querySelectorAll('.elemento').length
const precio=document.querySelectorAll('.precio')
let preciofinal=document.querySelector('.precio_final')
const incre=document.querySelectorAll('.incre')
for (let i=0;i<cantProducts;i++){
    incre[i].addEventListener('click',function(){
        if(event.target.classList[0]==='menos' || event.target.classList[0]==='menos-i'){
            if(parseInt(this.querySelector('strong').textContent)===0){
                this.querySelector('strong').textContent='0'
               }
            else if(parseInt(this.querySelector('strong').textContent)>0){                this.querySelector('strong').textContent=parseInt(this.querySelector('strong').textContent)-1
                    }
        }
        else if(event.target.classList[0]==='mas' || event.target.classList[0]==='mas-i'){
            this.querySelector('strong').textContent=parseInt(this.querySelector('strong').textContent)+1
                }
    })
}
let payall
let platosPedidos
let payallSum
const reducer = (accumulator, currentValue) => accumulator + currentValue;
var positionY
var formName
var formTel
var formStreet
var textSend
document.addEventListener('click',function(){
    payall=[]
    textSend=""
    platosPedidos=[]
    for(let i=0;i<cantProducts;i++){
        payall.push(+document.querySelectorAll('.precio')[i].textContent*+document.querySelectorAll('.cantpedida')[i].textContent)
    }
    payallSum=payall.reduce(reducer)
    document.querySelector('.precio_final').textContent=payallSum
    if ((event.target.classList[0]==='pedido_total' || event.target.classList[0]==='precio_final') && +document.querySelector('.precio_final').textContent>0){
        console.log(document.querySelector('.precio_final').textContent)
        console.log(payall)
        positionY = window.scrollY;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('.form_container').classList.remove('form_containerOff')
        document.body.classList.add('body_over')
    }
    if (event.target.classList[0]==='back' || event.target.classList[0]==='back-i'){
        document.querySelector('.form_container').classList.add('form_containerOff')
        document.body.classList.remove('body_over')
        window.scrollTo({ top: positionY, behavior: 'smooth' });
    }
    if (event.target.classList[0]==='pedidoAnDdatos'){
        formName=document.querySelector('.name_form').value
        formTel=document.querySelector('.tel_form').value
        formStreet=document.querySelector('.street_form').value
        if(formName.length>5 && formTel.length>5 && formStreet.length>5){
            for(let l=0;l<payall.length;l++){
                if((+payall[l])>0){
                    textSend+="%0A"+document.querySelectorAll('.nombre')[l].textContent +" x "+(+payall[l]/+document.querySelectorAll('.precio')[l].textContent).toString()+"u. "+(+payall[l]).toString()+" Soles"
                }
            }
            textSend+="%0ATotal a pagar: "+payallSum.toString()+" Soles"
            //Token=1622103754:AAGmgQWuoZXhTlpcmB7BIEHn-bxyDgJYBp8
            async function enviarMensaje() {
                //fetch('https://api.telegram.org/bot1622103754:AAGmgQWuoZXhTlpcmB7BIEHn-bxyDgJYBp8/getUpdates');
                await fetch('https://api.telegram.org/bot1622103754:AAGmgQWuoZXhTlpcmB7BIEHn-bxyDgJYBp8/sendMessage?text=------------------------------------------------------------%0ADATOS DEL PEDIDO:'+textSend+'%0A%0ADATOS DEL CLIENTE:%0A'+formName.toString()+'%0A'+formTel.toString()+'%0A'+formStreet.toString()+'%0A------------------------------------------------------------&chat_id='+(1160495005).toString())
            }
            enviarMensaje();
            document.querySelector('.loading').classList.remove('loadingOff')
            setTimeout(function(){window.open("index.html","_self")},3000);
        }
        else{
            document.querySelector('.datosCorrectos').textContent='Ingrese sus datos nuevamente'
        }
    }
    
})
