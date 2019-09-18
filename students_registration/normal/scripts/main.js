var alunos = {};

function pici () {
    let pici = document.createElement('select');
    pici.classList.add('input');

    let comp = document.createElement('option');
    comp.textContent = 'Computação';

    let mat = document.createElement('option');
    mat.textContent = 'Matemática';

    let geo = document.createElement('option');
    geo.textContent = 'Geologia';

    pici.append(comp);
    pici.append(mat);
    pici.append(geo);

    return pici;
}

function porang () {
    let porang = document.createElement('select');
    porang.classList.add('input');

    let med = document.createElement('option');
    med.textContent = 'Medicina';

    let odont = document.createElement('option');
    odont.textContent = 'Odontotologia';

    let farm = document.createElement('option');
    farm.textContent = 'Farmácia';

    porang.append(med);
    porang.append(odont);
    porang.append(farm);

    return porang;
}

function benfica () {
    let benfica = document.createElement('select');
    benfica.classList.add('input');

    let fil = document.createElement('option');
    fil.textContent = 'Filosofia';

    let soc = document.createElement('option');
    soc.textContent = 'Sociologia';

    let letras = document.createElement('option');
    letras.textContent = 'Letras';

    benfica.append(fil);
    benfica.append(soc);
    benfica.append(letras);

    return benfica;
}

function criar_aluno (person) {
    let aluno = document.createElement('div');
    aluno.classList.add('row');

    let matricula = document.createElement('div');
    matricula.classList.add('col');
    matricula.textContent = person.matricula;
    aluno.appendChild(matricula);

    let nome = document.createElement('div');
    nome.classList.add('col');
    nome.textContent = person.nome;
    aluno.appendChild(nome);

    let actions = document.createElement('div');
    actions.classList.add('col');
    aluno.appendChild(actions);

    let update = document.createElement('button');
    update.textContent = 'Alterar';
    update.classList.add('updater');
    update.onclick = alterar_aluno;
    actions.appendChild(update);

    let remove = document.createElement('button');
    remove.textContent = 'Remover';
    remove.classList.add('remover');
    remove.onclick = remover_aluno;
    actions.appendChild(remove);

    aluno.meta = person;
    return aluno;
}

function inserir_aluno (event) {
    event.preventDefault();

    let inputs = event.target.querySelectorAll(".input");
    let person = {
        matricula: inputs[0].value,
        nome: inputs[1].value,
        nascimento: inputs[2].value,
        email: inputs[3].value,
        operadora: inputs[4].value,
        telefone: inputs[5].value,
        campus: inputs[6].value,
        curso: inputs[7].value
    };

    if (alunos[person.matricula] == null) {
        alunos[person.matricula] = person;
        document.querySelector("#alunos").appendChild(criar_aluno(person));
        event.target.reset();
    }
    else {
        alert("Já existe um aluno cadastrado com esta matrícula!");
    }
}

function alterar_aluno (event) {
    let aluno = event.target.parentElement.parentElement;
    let form = document.querySelector("#form");
    let inputs = form.getElementsByClassName("input");

    inputs[0].value = aluno.meta.matricula;
    inputs[1].value = aluno.meta.nome;
    inputs[2].value = aluno.meta.nascimento;
    inputs[3].value = aluno.meta.email;
    inputs[4].value = aluno.meta.operadora;
    inputs[5].value = aluno.meta.telefone;
    inputs[6].value = aluno.meta.campus;
    mudar_campus();
    inputs[7].value = aluno.meta.curso;

    let submit = document.querySelector("#submit");
    submit.value = "Alterar";
    document.querySelector("#form form").onsubmit = salvar_alteracoes;
    document.querySelector("#form form").aluno_atual = aluno.meta;
}

function salvar_alteracoes (event) {
    event.preventDefault();

    let inputs = event.target.querySelectorAll(".input");
    let person = {
        matricula: inputs[0].value,
        nome: inputs[1].value,
        nascimento: inputs[2].value,
        email: inputs[3].value,
        operadora: inputs[4].value,
        telefone: inputs[5].value,
        campus: inputs[6].value,
        curso: inputs[7].value
    };

    let aluno = alunos[event.target.aluno_atual.matricula];
    if (aluno) {
        delete alunos[aluno.matricula];
        alunos[person.matricula] = person;

        for (row of document.querySelectorAll("#alunos .row")) {
            if (row.meta && row.meta == aluno) {
                let parent = row.parentElement;
                parent.removeChild(row);
                parent.appendChild(criar_aluno(person));
            }
        }
    }

    event.target.reset();
    event.target.aluno_atual = undefined;
}

function remover_aluno (event) {
    let aluno = event.target.parentElement.parentElement;
    if (confirm("Confirma a exclusão de " + aluno.meta.nome + "?")) {
        document.querySelector("#alunos").removeChild(aluno);
        alunos[aluno.meta.matricula] = null;
    }
}

function mudar_campus () {
    let campus = document.querySelector("#campus");
    let curso = document.querySelector('#curso');

    curso.removeChild(curso.children[0]);
    
    switch (campus.value) {
        case 'Pici':
            curso.appendChild(pici());
        break;

        case 'Porangabussu':
            curso.appendChild(porang());
        break;

        case 'Benfica':
            curso.appendChild(benfica());
        break;
    }
}
mudar_campus();

document.querySelector("#formulario form").addEventListener('reset', function(event) {
    event.target.querySelector("#campus").value = 'Pici';
    mudar_campus();
    let submit = event.target.querySelector("#submit");
    submit.value = "Inserir";
    event.target.onsubmit = inserir_aluno;
    event.target.aluno_atual = undefined;
});

document.querySelector("#phone-number").addEventListener('keyup', function(event) {
    if (event.key.length === 1) {
        switch (event.target.value.length) {
            case 1:
                if (event.key != '(') event.target.value = '(' + event.key;
            break;

            case 3:
                if (event.key != ')') event.target.value += ')';
            break;
        }
    }
});

document.querySelector("#campus").addEventListener('change', function(event) {
    mudar_campus();
});

document.querySelector("#info").addEventListener('click', function (event) {
    document.querySelector("#modal").classList = [];
    document.body.style.overflow = 'hidden';
});

document.querySelector("#modal").addEventListener('click', function (event) {
    this.classList.add('hidden');
    document.body.style.overflow = 'scroll';
});
