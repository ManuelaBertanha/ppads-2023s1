package br.mack.ads.apipresencajpa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.mack.ads.apipresencajpa.entities.Turma;

public interface TurmaRepository extends JpaRepository <Turma, Long> {

    public List<Turma> findByNomeTurmaContaining(String nomeTurma);

}
