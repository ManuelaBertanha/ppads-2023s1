package br.mack.ads.apipresencajpa.entities;

import jakarta.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table (name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    private String nomeAluno;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "turma_id", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Turma turma;

    public Aluno() {}

    public Aluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }
    
    /**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

    public String getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }
}
