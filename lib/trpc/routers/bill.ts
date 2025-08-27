import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { Decimal } from '@prisma/client/runtime/library';

export const billRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().default('Untitled Bill'),
      date: z.string().default(() => new Date().toISOString().split('T')[0]),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const bill = await ctx.prisma.bill.create({
          data: {
            name: input.name,
            date: new Date(input.date),
            amount: new Decimal(0),
            status: 'draft',
          },
        });

        return bill;
      } catch (err) {
        console.error('Create bill error:', err);
        throw err;
      }
    }),

  getById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const bill = await ctx.prisma.bill.findUnique({
          where: { id: input.id },
          include: {
            items: {
              include: {
                assignments: {
                  include: {
                    person: true,
                  },
                },
              },
            },
            percentageSurcharges: true,
            participants: {
              include: {
                person: true,
              },
            },
          },
        });

        if (!bill) {
          throw new Error('Bill not found');
        }

        return bill;
      } catch (err) {
        console.error('Get bill error:', err);
        throw err;
      }
    }),

  updateBill: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      date: z.string().optional(),
      status: z.enum(['draft', 'finalised', 'settled']).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const updateData: any = {};
        if (input.name !== undefined) updateData.name = input.name;
        if (input.date !== undefined) updateData.date = new Date(input.date);
        if (input.status !== undefined) updateData.status = input.status;

        const bill = await ctx.prisma.bill.update({
          where: { id: input.id },
          data: updateData,
        });

        return bill;
      } catch (err) {
        console.error('Update bill error:', err);
        throw err;
      }
    }),

  addItem: publicProcedure
    .input(z.object({
      billId: z.string(),
      name: z.string(),
      price: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const item = await ctx.prisma.billItem.create({
          data: {
            billId: input.billId,
            name: input.name,
            price: new Decimal(input.price),
          },
        });

        return item;
      } catch (err) {
        console.error('Add item error:', err);
        throw err;
      }
    }),

  updateItem: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      price: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const updateData: any = {};
        if (input.name !== undefined) updateData.name = input.name;
        if (input.price !== undefined) updateData.price = new Decimal(input.price);

        const item = await ctx.prisma.billItem.update({
          where: { id: input.id },
          data: updateData,
        });

        return item;
      } catch (err) {
        console.error('Update item error:', err);
        throw err;
      }
    }),

  deleteItem: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.billItem.delete({
          where: { id: input.id },
        });

        return { success: true };
      } catch (err) {
        console.error('Delete item error:', err);
        throw err;
      }
    }),

  addParticipant: publicProcedure
    .input(z.object({
      billId: z.string(),
      name: z.string(),
      color: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // First create the person
        const person = await ctx.prisma.person.create({
          data: {
            name: input.name,
            color: input.color,
          },
        });

        // Then add them as a participant
        await ctx.prisma.billParticipant.create({
          data: {
            billId: input.billId,
            personId: person.id,
          },
        });

        return person;
      } catch (err) {
        console.error('Add participant error:', err);
        throw err;
      }
    }),

  assignItemToPerson: publicProcedure
    .input(z.object({
      billItemId: z.string(),
      personId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const assignment = await ctx.prisma.billItemAssignment.create({
          data: {
            billItemId: input.billItemId,
            personId: input.personId,
          },
        });

        return assignment;
      } catch (err) {
        console.error('Assign item error:', err);
        throw err;
      }
    }),

  removeItemAssignment: publicProcedure
    .input(z.object({
      billItemId: z.string(),
      personId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.billItemAssignment.delete({
          where: {
            billItemId_personId: {
              billItemId: input.billItemId,
              personId: input.personId,
            },
          },
        });

        return { success: true };
      } catch (err) {
        console.error('Remove assignment error:', err);
        throw err;
      }
    }),
}); 