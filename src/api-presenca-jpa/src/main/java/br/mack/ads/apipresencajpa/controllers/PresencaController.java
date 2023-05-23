package br.mack.ads.apipresencajpa.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mack.ads.apipresencajpa.entities.Presenca;
import br.mack.ads.apipresencajpa.repository.PresencaRepository;
import br.mack.ads.apipresencajpa.entities.Aluno;
import br.mack.ads.apipresencajpa.repository.AlunoRepository;

@RestController
@RequestMapping("/api")
public class PresencaController {

    @Autowired
    PresencaRepository presencaRepository;

    @Autowired
    AlunoRepository alunoRepository;

    @PostMapping("/alunos/{alunoId}/presenca")
    public ResponseEntity<Presenca> create(@PathVariable("alunoId") long alunoId, @RequestBody Presenca presenca) {
        Aluno aluno = alunoRepository.findById(alunoId).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
        presenca.setAluno(aluno);
        Calendar currentDate = Calendar.getInstance();
        presenca.setDataPresenca(currentDate);
        Presenca _presenca = presencaRepository.save(presenca);
        return new ResponseEntity<>(_presenca, HttpStatus.CREATED);
    }

    @GetMapping("/presencas")
    public ResponseEntity<List<Presenca>> read() {
        List<Presenca> presencas = presencaRepository.findAll();
        return new ResponseEntity<>(presencas, HttpStatus.OK);
    }

    @GetMapping("/alunos/{alunoId}/presencas")
    public ResponseEntity<List<Presenca>> readByAlunoId(@PathVariable("alunoId") long alunoId) {
        List<Presenca> presencas = presencaRepository.findByAlunoId(alunoId);
        return new ResponseEntity<>(presencas, HttpStatus.OK);
    }

    @DeleteMapping("/presencas/{id}") // Apagar depois
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        presencaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/presencas/{id}")
    public Presenca update(@RequestBody Presenca presenca, @PathVariable long id) {
        Optional<Presenca> op = this.presencaRepository.findById(id);
        if (op.isPresent()) {

            Presenca s = op.get();

            boolean falta = presenca.getFalta();

            s.setFalta(falta);

            this.presencaRepository.save(s);
            return s;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    
}
