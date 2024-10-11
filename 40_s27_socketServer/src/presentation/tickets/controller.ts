import { Request, Response } from "express"; 
import { TicketService } from "../services/ticket.service";

export class TicketController {

    constructor(
        private readonly ticketservice = new TicketService()
    ) {}

    public getTickets = async (req : Request, res : Response) => {
        //res.json('getTickets');
        res.json(this.ticketservice.tickets);
    }

    public getLastTicketNumber = async (req : Request,  res : Response) => {
        //res.json('getLastTicketNumber');
        res.json(this.ticketservice.lastTicketNumber);
    }

    public pendingTickets = async (req : Request,  res : Response) => {
        //res.json('pendingTickets');
        res.json(this.ticketservice.pendingTickets);
    }

    public createTicket = async (req : Request,  res : Response) => {
        //res.json('createTicket');
        res.status(201).json(this.ticketservice.createTicket());
    }

    public drawTicket = async (req : Request,  res : Response) => {
        //res.json('drawTicket');
        const { desk } = req.params;
        res.json(this.ticketservice.drawTicket(desk));
    }

    public ticketFiniched = async (req : Request,  res : Response) => {
        //res.json('ticketFiniched');
        const { ticketId} = req.params;
        res.json(this.ticketservice.onFinishedTicket(ticketId));
    }

    public workingOn = async (req : Request,  res : Response) => {
        //res.json('workingOn');
        res.json(this.ticketservice.lastWorkingOnTickets);
    }

}