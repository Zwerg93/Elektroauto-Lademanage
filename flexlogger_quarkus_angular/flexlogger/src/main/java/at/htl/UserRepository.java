package at.htl;

import at.htl.model.User;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

public class UserRepository {

    @Inject
    EntityManager em;


    public void addUser(User user) {
        em.persist(user);
    }

    public void updateUser(User user) {

    }

    public String getUsername(int id) {
        String q = "Select u.username from User u where u.id = :id";
        return em.createQuery(q, User.class).getSingleResult().getUsername();
    }
}
