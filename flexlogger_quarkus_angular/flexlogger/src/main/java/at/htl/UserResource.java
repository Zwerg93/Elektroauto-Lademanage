package at.htl;

import at.htl.model.User;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class UserResource {
    @Inject
    UserRepository ur;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getUsernameById(int id) {
        return ur.getUsername(id);
    }

    // User hinzufügen
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public void addUser(User user){
        ur.addUser(user);
    }

    // User updaten
    // TODO
    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateUser(User user){
        ur.updateUser(user);
    }
}