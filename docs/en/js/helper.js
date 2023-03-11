//  get variable server domain



async function GetServerDomain() {
    try {
        const response = await fetch('https://api.github.com/gists/458cc68066d2c1e0fa01ba1271e81699');
        const gist = await response.json();
        const content = gist.files['ngrok.txt'].content;
        return content;
    } catch (error) {
        console.error(error);
    }

}

// let serverName;

// function server2() {
//     return fetch('https://api.github.com/gists/458cc68066d2c1e0fa01ba1271e81699').then(function(response) {
//         gist = response.json();
//         return gist
//     }).then(function(response) {
//         res = response.files['ngrok.txt'].content;
//         return res
//     }).then(function(response) {
//         serverName = response
//     })

// }













// get server domain from json file 

function getServerDomainJson() {
    $.getJSON("../json/file.json", function(data) {

        return data['apiurl'];
    })
}