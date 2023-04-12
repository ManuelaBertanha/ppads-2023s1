package br.mack.ads.apipresencajpa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.mack.ads.apipresencajpa.entities.Aluno;

public interface AlunoRepository extends JpaRepository <Aluno, Long> {

    List<Aluno> findByNomeAlunoContaining(String nomeAluno);
    public List<Aluno> findByTurmaId(Long id);
    
}