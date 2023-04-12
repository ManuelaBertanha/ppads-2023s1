package br.mack.ads.apipresencajpa.entities;

import jakarta.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table (name = "professor")
public class Professor {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    private String nomeProfessor;
    private String nomeDisciplina;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "turma_id", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Turma turma;

    public Professor() {}

    public Professor(String nomeProfessor, String nomeDisciplina) {
        this.nomeProfessor = nomeProfessor;
        this.nomeDisciplina = nomeDisciplina;
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

    public String getNomeProfessor() {
        return nomeProfessor;
    }

    public void setNomeProfessor(String nomeProfessor) {
        this.nomeProfessor = nomeProfessor;
    }

    public String getNomeDisciplina() {
        return nomeDisciplina;
    }

    public void setNomeDisciplina(String nomeDisciplina) {
        this.nomeDisciplina = nomeDisciplina;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }
}
