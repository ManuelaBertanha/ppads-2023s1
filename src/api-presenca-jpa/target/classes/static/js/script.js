var turmas;
var alunos;
var codTurma;
var presenca = [];
var idAluno;

window.onload = function () {
    initial();
};

function initial() {
    document.getElementById("logInSection").innerHTML =
        "<button class=but3 type=button onclick=loadTurmas()>" +
        "Fazer chamada" +
        "</button>";
    document.getElementById("relatorioSection").innerHTML =
        "<button class=but4 type=button onclick=showOptions()>" +
        "Gerar relatório de faltas" +
        "</button>";
}

function loadTurmas() {
    document.getElementById("logInSection").innerHTML = "";
    document.getElementById("relatorioSection").innerHTML = "";
    document.getElementById("turmaSection").innerHTML = "";
    callAPI("/api/turmas", "GET", function (status, response) {
        if (status === 200) {
            turmas = response;
            var section = document.getElementById("turmaSection");
            var str = "";
            console.log(response);
            for (var i = turmas.length - 1; i >= 0; i--) {
                codTurma = turmas[i].id;
                str += "<article id='turmas'>";
                str +=
                    "<button class=but1 type=button onclick=loadAlunos('" +
                    codTurma +
                    "')>" +
                    "TURMA " +
                    turmas[i].nomeTurma +
                    "</button>";
                str += "</article> ";
            }
            section.innerHTML += str;
        }
    });
}

function loadAlunos(codTurma) {
    document.getElementById("alunoSection").innerHTML = "";
    callAPI(`/api/turmas/${codTurma}/alunos`, "GET", function (status, response) {
        if (status === 200) {
            alunos = response;
            var section = document.getElementById("alunoSection");
            var str = "";
            console.log(response);
            str += "<div id=containerAluno>";
            for (var i = alunos.length - 1; i >= 0; i--) {
                presenca.push(alunos[i].id);
                str += "<article>";
                str += "<p>" + alunos[i].nomeAluno + "</p>";
                str += "<input type='checkbox' name='checkAluno' value=" + alunos[i].id + ">";
                str += "</article>";
            }
            str += "<div id=divButton>";
            str +=
                "<button class=but2 type=submit onclick=sendFaltas('" + presenca + "')>Realizar chamada</button>";
            str += "</div>";
            str += "</div>";
            section.innerHTML += str;
        }
    });
}

function sendFaltas(presenca) {
    var newAusente = {
        falta: true,
    };
    var newPresente = {
        falta: false,
    };
    var newPresenca = presenca.split(",");
    console.log(newPresenca);

    var alunoAusente = [];
    var checkedboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkedboxes.length; i++) {
        alunoAusente.push(checkedboxes[i].value);
    }
    console.log(alunoAusente);

    if (alunoAusente.length > 0) {
        for (var i = 0; i < alunoAusente.length; i++) {
            if (newPresenca.includes(alunoAusente[i]) == true) {
                for (j = 0; j < newPresenca.length; j++) {
                    if (newPresenca[j] == alunoAusente[i]) {
                        newPresenca.splice(j, 1);
                    }
                }
            }
            callAPI(
                `/api/alunos/${alunoAusente[i]}/presenca`,
                "POST",
                function (status, response) {
                    console.log(status);
                },
                newAusente
            );
        }
        for (var i = 0; i < newPresenca.length; i++) {
            callAPI(
                `/api/alunos/${newPresenca[i]}/presenca`,
                "POST",
                function (status, response) {
                    console.log(status);
                },
                newPresente
            );
        }
        console.log("depois: " + newPresenca);
    } else {
        for (var i = 0; i < newPresenca.length; i++) {
            callAPI(
                `/api/alunos/${newPresenca[i]}/presenca`,
                "POST",
                function (status, response) {
                    console.log(status);
                },
                newPresente
            );
        }
    }
    alert("Presença registrada com sucesso!");
    document.location.reload(true);
}

function showOptions() {
    document.getElementById("logInSection").innerHTML = "";
    document.getElementById("relatorioSection").innerHTML = "";
    var section = document.getElementById("relatorioSection");
    var str = "";
    str += "<label for=relatorios>Selecione:</label>";
    str += " ";
    str += "<select id=relatorios onchange=selectedOption()>";
    str += "<option value=Turmas>Turmas</option>";
    str += "<option value=Professor>Professor</option>";
    str += "<option value=Ano>Ano</option>";
    str += "<option value=Aluno>Aluno</option>";
    str += "<option value=Disciplina>Disciplina</option>";
    str += "<option value=Data>Data</option>";
    str += "</select>";
    str += "<section id='response'></section>";
    section.innerHTML += str;
}

function selectedOption() {
    var select = document.getElementById("relatorios");
    var selectedOption = select.options[select.selectedIndex].value;
    if (selectedOption === "Turmas") {
        selectTurmas();
    } else if (selectedOption === "Professor") {
        selectProfessor();
    } else if (selectedOption === "Aluno") {
        selectAluno();
    }
}

function selectTurmas() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI("/api/turmas", "GET", function (status, response) {
        if (status === 200) {
            turmas = response;
            var section = document.getElementById("response");
            var str = "";
            str += "<label class=label for=responseTurmas></label>";
            str += "<select id=responseTurmas onclick=loadRelatorio()>";
            console.log(response);
            for (var i = turmas.length - 1; i >= 0; i--) {
                codTurma = turmas[i].id;
                str += "<>";
                str +=
                    "<option value=Turma" +
                    turmas[i].nomeTurma +
                    ">" +
                    "Turma A " +
                    turmas[i].nomeTurma +
                    "</option>";
            }
            str += "</select> ";
            section.innerHTML += str;
        }
    });
}

function selectProfessor() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI("/api/professor", "GET", function (status, response) {
        if (status === 200) {
            professor = response;
            var section = document.getElementById("response");
            var str = "";
            str += "<label class=option for=responseProfessor> Turmas: </label>";
            str += "<select id=responseProfessor onclick=loadRelatorio()>";
            console.log(response);
            for (var i = professor.length - 1; i >= 0; i--) {
                codProf = professor[i].id;
                str += "<>";
                str +=
                    "<option value=" +
                    profesor[i].nomeProfessor +
                    ">" +
                    "TURMA " +
                    turmas[i].nomeProfessor +
                    "</select>";
            }
            str += "</select> ";
            section.innerHTML += str;
        }
    });
}

function selectAno() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI("/api/ano", "GET", function (status, response) {
        if (status === 200) {
            ano = response;
            var section = document.getElementById("response");
            var str = "";
            str += "<label class=option for=responseAno> Ano letivo: </label>";
            str += "<select id=responseAno onclick=loadRelatorio()>";
            //Não sei como está a rota do ano
            console.log(response);
            for (var i = professor.length - 1; i >= 0; i--) {
                codProf = professor[i].id;
                str += "<>";
                str +=
                    "<option value=" +
                    profesor[i].nomeProfessor +
                    ">" +
                    "Ano " +
                    turmas[i].nomeProfessor +
                    "</option>";
            }
            str += "</select> ";
            section.innerHTML += str;
        }
    });
}

function selectAluno() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI("/api/alunos", "GET", function (status, response) {
        if (status === 200) {
            alunos = response;
            var section = document.getElementById("relatorioSection");
            var str = "";
            str += "<form class='form1' name='form' action='#' method=post>";
            for (var i = alunos.length - 1; i >= 0; i--) {
                str += "<br><input type='radio' name='radioAluno' value='" + alunos[i].id + "'>" + alunos[i].nomeAluno;
            }
            str += "<br><br><input class='but5' type='button' value='Gerar relatório' onClick='validation()'>";
            str += "<p id='error'></p>";
            str += "</form>";
            section.innerHTML += str;
        }
    });
}

function validation() {
    var alunos = document.form.radioAluno;
    for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].checked) {
            break;
        }
    }
    if (i == alunos.length) {
        return document.getElementById("error").innerHTML = "Please check any radio button";
    }
    console.log(alunos[i]);
    loadAlunoRelatorio(alunos[i].value);
}

function loadAlunoRelatorio(idAluno) {
    console.log(idAluno);
    document.getElementById("error").innerHTML = "";
    callAPI(`/api/alunos/${idAluno}/presencas`, "GET", function (status, response) {
        if (status === 200) {
            presenca = response;
            var section = document.getElementById("error");
            var str = "";
            str += "<table><tr><th>Data</th><th>Falta</th><th>Disciplina</th></tr>";
            for (var i = presenca.length - 1; i >= 0; i--) {
                str += "<tr><td>" + presenca[i].dataPresenca + "</td><td>" + presenca[i].falta + "</td><td>Ed. Física</td></tr>";
            }
            str += "</table>";
            section.innerHTML += str;
        }
    });
}

function selectDisciplina() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI(
        `/api/turmas/${codTurma}/disciplina`,
        "GET",
        function (status, response) {
            if (status === 200) {
                aluno = response;
                var section = document.getElementById("response");
                var str = "";
                str +=
                    "<label class=option for=responseDisciplina> Disciplina: </label>";
                str += "<select id=responseDisciplina onclick=loadRelatorio()>";
                console.log(response);
                for (var i = disciplinas.length - 1; i >= 0; i--) {
                    // codAluno = alunos[i].id;
                    str += "<>";
                    str +=
                        "<option value=" +
                        disciplinas[i].nomeDisciplina +
                        ">" +
                        "Disciplina " +
                        disciplinas[i].nomeDisciplina +
                        "</option>";
                }
                str += "</select> ";
                section.innerHTML += str;
            }
        }
    );
}

function selectData() {
    document.getElementById("relatorioSection").innerHTML = "";
    callAPI(`/api/presenca`, "GET", function (status, response) {
        if (status === 200) {
            presenca = response;
            var section = document.getElementById("response");
            var str = "";
            str += "<label class=option for=responseData> Data: </label>";
            str += "<select id=responseData onclick=loadRelatorio()>";
            console.log(response);
            for (var i = presenca.length - 1; i >= 0; i--) {
                // codAluno = alunos[i].id;
                str += "<>";
                str +=
                    "<option value=" +
                    presenca[i].dataAula +
                    ">" +
                    "Data " +
                    presenca[i].dataAula +
                    "</option>";
            }
            str += "</select> ";
            section.innerHTML += str;
        }
    });
}

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = "json";
    xhr.open(method, url, true);
    if (method == "POST" || method == "PUT" || method == "UPDATE") {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    };

    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}