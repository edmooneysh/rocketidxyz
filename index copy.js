const qr = require("qr-image")

const landing = `
<!DOCTYPE html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
<section class="section">
  <div class="container">
    <h1 class="title">
    Rocket ID
    </h1>
    <p class="mt-4 mb-5">Generate a QR code to tape to your rockets to aid recovery. Enter a website or google maps link for people who find your rocket.</p>
<input type="text" id="text" value="https://nar.org"></input>
<button class="button is-primary" onclick="generate()">Generate QR Code</button>
<p class="mt-4">Check the "Network" tab in your browser's developer tools to see the generated QR code.</p>
<script>
  function generate() {
    var tstamp = Date.now();
    var res_img = fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: document.querySelector("#text").value, tstamp: tstamp.toString() })
    }).then(function(response) {
      console.log(response)
      var res_ele = document.getElementById('res');
      res_ele.src = response.value;
    });
  }

  

  
</script>
  </div>
  <div id="resdata">
  <img id="res"/>
  </div>
</section>
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
  //tstamp = Date.now()
  //const headers = { "Content-Type": "image/png" }
  //const headers = { "Content-Type": "text/plain" }
  const headers_png = { "Content-Type": "image/png" }
  const qr_png = qr.imageSync(text || "https://workers.dev")
  return new Response(qr_png, {headers_png})
  //save the data to KV
  const rocket_put = await rocketimage.put(tstamp.toString(), qr_png)
  const qr_saved_val = await rocketimage.get(tstamp, {type: "arrayBuffer"})
  if (qr_saved_val === null) {
    return new Response('error')
  }

  
}



async function handleRequest(request) {
  if (request.method === "POST") {
      return generate(request)
  }
  return new Response(landing, { headers: {
    "Content-Type": "text/html"
  }
 })
}
