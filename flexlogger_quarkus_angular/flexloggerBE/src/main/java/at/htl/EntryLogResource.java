package at.htl;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Set;

@Path("/csv")
@Produces(MediaType.APPLICATION_JSON)


public class EntryLogResource {
    EntryLogRepository elr = new EntryLogRepository();
    private Set<LogTable> legumes = Collections.synchronizedSet(new LinkedHashSet<>());


    @GET
    public Set<LogTable> getAll() {
        //System.out.println(elr.getAll());
        System.out.println(elr.getAll().iterator().next().dpId);
        return elr.getAll();
    }


    @GET
    @Path("/ka")
    public Set<LogTable> list() {
        legumes.add(new LogTable("Carrot", "w", "A", 1203213l));
        legumes.add(new LogTable("Carrot", "w", "A", 1203213l));
        return legumes;
    }

}
