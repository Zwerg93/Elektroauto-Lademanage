package eu.flexsolution.task;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;

@Path("/csv")
@Produces(MediaType.APPLICATION_JSON)


public class Sqlite3Resource {

    private Set<Logtable> fruits = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

    public Sqlite3Resource() {
        fruits.add(new Logtable("Apple", "Winter fruit","A",123l));
        fruits.add(new Logtable("Apple", "Winter fruit","A",123l));

    }

    @GET
    public Set<Logtable> list() {
        return fruits;
    }

    @POST
    public Set<Logtable> add(Logtable fruit) {
        fruits.add(fruit);
        return fruits;
    }

    @DELETE
    public Set<Logtable> delete(Logtable fruit) {
        fruits.removeIf(existingFruit -> existingFruit.dpId.contentEquals(fruit.dpId));
        return fruits;
    }




}
