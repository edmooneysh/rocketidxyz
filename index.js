const qr = require("qr-image")

const basehtml=`
<!DOCTYPE html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<style type="text/css">

#tab-content section {
  display: none;
}

#tab-content section.is-active {
  display: block;
}


</style>

</head>

<body>
<section class="section">
  <div class="container">
    <h1 class="title">
    Rocket ID 🚀
    </h1>
    <p class="mt-4 mb-5">Generate a QR code to tape to your rockets to aid recovery. Enter a website or google maps link for people who find your rocket.</p>

<br/><br/>
<div class="tabs is-toggle is-centered" id="tabs">
    <ul>
      <li class="is-active" data-tab="1"><a>Text</a></li>

      <li data-tab="2"><a>Hyperlink</a></li>
    
      <li data-tab="3"><a>Email</a></li>

    </ul>
</div>


        <!-- message -->
        

        <div id="tab-content">

        <!-- message -->

        <section class="is-active" data-content="1">
         
          <form onsubmit="process('message'); return false"> 
          
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" id="messagefd" placeholder="Textarea"></textarea>
            </div>
          </div>
          
          
          
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>

          </form>

          <div id="resdatamessage">
          <img id="resmessage"/><br/>
          <a id="printmessage"></a>
          </div>


        </section>

        <!-- hyperlink -->
        <section data-content="2">

        <form onsubmit="process('hyperlink'); return false"> 

        <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" id="hyperlinkfd" type="text" placeholder="https://someurl.com">
        </div>
        <p class="help">Include the http:// or https:// in the above</p>
      </div>


        <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>

      </form>

      <div id="resdatahyperlink">
      <img id="reshyperlink"/><br/>
      </div>

    </section>



        <!-- email -->
        <section data-content="3">

        <form onsubmit="process('email'); return false"> 
        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" id="emailfd" type="email" placeholder="Email input" value="youremail@outlook.com">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help">Enter the email to contacted at</p>
          </div>

          <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <input class="input" id="emailsubfd" type="text" placeholder="Found The Rocket">
        </div>
      </div>

          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" id="emailmsgfd" placeholder="Enter text"></textarea>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>

        </form>

        <div id="resdataemail">
        <img id="resemail"/><br/>
        </div>
        

        </section>


    </div>

    

  </div>

  <script type="text/javascript">

  // <a href="#" onclick="prepHref(this)" download>Click here to download image</a>  

  function prepHref(linkElement) { 
    var myDiv = document.getElementById('fullsized_image_holder'); 
    var myImage = myDiv.children[0]; 
    linkElement.href = myImage.src;
} 


const TABS = [...document.querySelectorAll('#tabs li')];
const CONTENT = [...document.querySelectorAll('#tab-content section')];
const ACTIVE_CLASS = 'is-active';

function initTabs() {
    TABS.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        let selected = tab.getAttribute('data-tab');
        updateActiveTab(tab);
        updateActiveContent(selected);
      })
    })
}

function updateActiveTab(selected) {
  TABS.forEach((tab) => {
    if (tab && tab.classList.contains(ACTIVE_CLASS)) {
      tab.classList.remove(ACTIVE_CLASS);
    }
  });
  selected.classList.add(ACTIVE_CLASS);
}

function updateActiveContent(selected) {
  CONTENT.forEach((item) => {
    if (item && item.classList.contains(ACTIVE_CLASS)) {
      item.classList.remove(ACTIVE_CLASS);
    }
    let data = item.getAttribute('data-content');
    if (data === selected) {
      item.classList.add(ACTIVE_CLASS);
    }
  });
}

initTabs();


  function process(section) {

    if (section == 'email') {
      console.log('email');
      var email = document.getElementById('emailfd').value;
      var email_sub = encodeURIComponent(document.getElementById('emailsubfd').value);
      var email_msg = encodeURIComponent(document.getElementById('emailmsgfd').value);
      var res_data= 'mailto:'+email+'?subject='+email_sub+'&body='+email_msg;

      //console.log(res_data);
      generate(res_data, section);

    } else if (section == 'message') {
      console.log('message');
      var message = document.getElementById('messagefd').value;
      var res_data = message.toString();
      //console.log(res_data);
      generate(res_data, section);

    } else if (section == 'hyperlink') {
      var hyperlink = document.getElementById('hyperlinkfd').value;
      var res_data = hyperlink.toString();
      //console.log(res_data);
      generate(res_data, section);
    }


  }


  function generate(res_data, section) {
    var tstamp = Date.now();
    var image = document.getElementById('res'+section);
    var res_img = fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: res_data, tstamp: tstamp.toString() })
    }).then(response => response.body)
      .then(body => {
        const reader = body.getReader();

        return new ReadableStream({
          start(controller) {
            return pump();

            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }

                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => console.log(image.src = url))
      .catch(err => console.error(err));


      

  }

  function makePrint(url){
    var printele = document.getElementById('print'+section);
    var printtext = document.createTextNode('Print');
    printele.href= url;
    printele.appendChild(printtext);

  }


  </script>

</body>

</html>
`

  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  
  async function generate(request){
    var req = await request.json()
    var text = req.text.toString()
    var tstamp = req.tstamp.toString()
    const headers_png = { "Content-Type": "image/png" }
    const qr_png = qr.imageSync(text || "https://rocketid.xyz")
    
    //save the data to KV
    const rocket_put = await rocketimage.put(tstamp.toString(), qr_png)
    const qr_saved_val = await rocketimage.get(tstamp, {type: "arrayBuffer"})
    if (qr_saved_val === null) {
      return new Response('error')
    }

    return new Response(qr_saved_val, {headers_png})
  
    
  }
  
  
  
  async function handleRequest(request) {
    if (request.method === "POST") {
        return generate(request)
    }
    return new Response(basehtml, {headers: {"Content-Type":'text/html; charset=UTF-8'},})
  }
  

