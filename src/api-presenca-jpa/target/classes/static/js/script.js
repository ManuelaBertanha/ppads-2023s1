var turmas;
var alunos;
var codTurma;
var presenca = [];

window.onload = function(){
    initial();
}

function initial() {
    document.getElementById('logInSection').innerHTML = "<button class=but3 type=button onclick=loadTurmas()>"+ "Fazer chamada" +"</button>";
    document.getElementById('relatorioSection').innerHTML = "<button class=but4 type=button onclick=loadRelatorio()>"+ "Gerar relatório de faltas" +"</button>";
}

function loadTurmas(){
    document.getElementById('logInSection').innerHTML = "";
    document.getElementById('relatorioSection').innerHTML = "";
    document.getElementById('turmaSection').innerHTML = "";
    callAPI('/api/turmas', 'GET', function(status, response){
        if (status === 200){
            turmas = response
            var section = document.getElementById('turmaSection');
            var str = "";
            console.log(response)
            for (var i=turmas.length-1; i>=0; i--){
            codTurma = turmas[i].id;
            str += "<article id='turmas'>";
            str += "<button class=but1 type=button onclick=loadAlunos('" + codTurma + "')>"+ "TURMA " + turmas[i].nomeTurma +"</button>";
            str += "</article> ";
            }
            section.innerHTML += str;
        }
    });
}

function loadAlunos(codTurma){ 
    document.getElementById('alunoSection').innerHTML = "";
    callAPI(`/api/turmas/${codTurma}/alunos`, 'GET', function(status, response){
        if (status === 200){
            alunos = response
            var section = document.getElementById('alunoSection');
            var str = "";
            console.log(response)
            for(var i=alunos.length-1; i>=0; i--){
                //console.log(i);
                presenca.push(alunos[i].id);
                str += "<article>";                    
                str += "<p>"+ alunos[i].nomeAluno +"</p>"; 
                str += "<input type='checkbox' name='checkAluno' value="+ alunos[i].id + ">";           
                str += "</article>";
            }
            str += "<button class=but2 type=submit onclick=sendFaltas('" + presenca + "')>Realizar chamada</button>";
            section.innerHTML += str;
        }
    });
}

function loadRelatorio() {
    console.log("Implementar: Gerar Relatório");
}

function sendFaltas(presenca) {
    var newAusente = {
        falta: true
    }
    var newPresente = {
        falta: false
    }
    var newPresenca = presenca.split(',');
    console.log(newPresenca);

    var alunoAusente = [];
    var checkedboxes = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i=0; i<checkedboxes.length; i++) {
        alunoAusente.push(checkedboxes[i].value)
    }
    console.log(alunoAusente);

    if (alunoAusente.length > 0) {
        for (var i=0; i<alunoAusente.length; i++) {
            if (newPresenca.includes(alunoAusente[i]) == true) {
                for (j=0; j<newPresenca.length; j++) {
                    if (newPresenca[j] == alunoAusente[i]) {
                        newPresenca.splice(j,1);
                    }
                }
            }
            callAPI(`/api/alunos/${alunoAusente[i]}/presenca`, 'POST', function(status, response) {
                console.log(status);

            },newAusente);
        }
        for(var i=0; i<newPresenca.length; i++){
            callAPI(`/api/alunos/${newPresenca[i]}/presenca`, 'POST', function(status, response) {
                console.log(status);
                
            },newPresente);
        }
        console.log("depois: " + newPresenca);
    } else {
       
        for (var i=0; i<newPresenca.length; i++) {
            callAPI(`/api/alunos/${newPresenca[i]}/presenca`, 'POST', function(status, response) {
                console.log(status);
            }, newPresente);
        }
    }
    alert("Presença registrada com sucesso!");
    document.location.reload(true);
}

function callAPI(url, method, callback, data){
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PUT' || method == 'UPDATE'){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function(){
        callback(xhr.status, xhr.response);
    }

    if (data) {
        xhr.send( JSON.stringify(data) );
    } else {
        xhr.send();
    }
}