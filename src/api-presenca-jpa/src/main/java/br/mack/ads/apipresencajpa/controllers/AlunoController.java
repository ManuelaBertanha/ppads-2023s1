package br.mack.ads.apipresencajpa.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mack.ads.apipresencajpa.entities.Aluno;
import br.mack.ads.apipresencajpa.repository.AlunoRepository;
import br.mack.ads.apipresencajpa.entities.Turma;
import br.mack.ads.apipresencajpa.repository.TurmaRepository;

@RestController
@RequestMapping("/api")
public class AlunoController {

    @Autowired
    AlunoRepository alunoRepository;

    @Autowired
    TurmaRepository turmaRepository;
    
    @PostMapping("/turmas/{turmaId}/aluno")
    public ResponseEntity<Aluno> create(@PathVariable("turmaId") long turmaId, @RequestBody Aluno aluno) {
        Turma turma = turmaRepository.findById(turmaId).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
        aluno.setTurma(turma);
        Aluno _aluno = alunoRepository.save(aluno);
        return new ResponseEntity<>(_aluno, HttpStatus.CREATED);
    }

    @GetMapping("/alunos")
    public ResponseEntity<List<Aluno>> read() {
        List<Aluno> alunos = alunoRepository.findAll();
        return new ResponseEntity<>(alunos, HttpStatus.OK);
    }

    @GetMapping("/turmas/{turmaId}/alunos")
    public ResponseEntity<List<Aluno>> readByTurmaId(@PathVariable("turmaId") long turmaId) {
        List<Aluno> alunos = alunoRepository.findByTurmaId(turmaId);
        return new ResponseEntity<>(alunos, HttpStatus.OK);
    }

    @DeleteMapping("/alunos/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        alunoRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/alunos/{id}")
    public Aluno update(@RequestBody Aluno aluno, @PathVariable long id) {
        Optional<Aluno> op = this.alunoRepository.findById(id);
        if (op.isPresent()) {

            Aluno s = op.get();

            String nomeAluno = aluno.getNomeAluno();

            
            if (nomeAluno != null) s.setNomeAluno(nomeAluno);
            
            this.alunoRepository.save(s);
            return s;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
