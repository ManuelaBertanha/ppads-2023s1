var turmas;
var alunos;
window.onload = function(){
    loadTurmas();
}
function loadAlunos(){
    document.getElementById('alunoSection').innerHTML = "";
    callAPI('/api/alunos', 'GET', function(status, response){
        if (status === 200){
            alunos = response
            var section = document.getElementById('alunoSection');
            var str = "";
            console.log(response)
            for(var i=alunos.length-1; i>=0; i--){
                console.log(i);
                str += "<article>";                    
                str += "<h2>"+ alunos[i].nomeAluno +"</h2>"; 
                str += "<input type='checkbox'>"           
                str += "</article>";
                

                
            }
            section.innerHTML += str;
            
        }
    
    });
}
function loadTurmas(){
    document.getElementById('turmaSection').innerHTML = "";
    callAPI('/api/turmas', 'GET', function(status, response){
        if (status === 200){
            turmas = response
            var section = document.getElementById('turmaSection');
            var str = "";
            console.log(response)
            for (var i=turmas.length-1; i>=0; i--){
            str += "<article>";     
            str += "<h2> Turma "+ turmas[i].nomeTurma +"</h2>";       
            str += "<h2> Ano "+ turmas[i].anoTurma +"</h2>";
            str += "<footer>";
            str += "<button class=but1 onclick=loadAlunos()>Alunos</button>";
            str += "</footer>";            
            str += "</article> ";
            }

            section.innerHTML += str;
        }
    
    });
}

function callAPI(url, method, callback, data){
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'UPDATE'){
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