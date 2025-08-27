# Prisma Migration Guide

This document outlines the migration from raw SQL migrations to Prisma ORM integration.

## What Changed

### 🗂️ Files Added
- `prisma/schema.prisma` - Prisma schema defining your database structure
- `lib/prisma.ts` - Prisma client instance with proper configuration
- `.env` - Environment variables (including DATABASE_URL for Prisma)

### 🔄 Files Updated
- `lib/types.ts` - Now uses Prisma-generated types
- `lib/trpc/context.ts` - Added Prisma client to tRPC context
- `lib/trpc/routers/bill.ts` - Replaced Supabase queries with Prisma operations
- `package.json` - Added Prisma scripts

### 📦 Dependencies Added
- `@prisma/client` - Prisma client for database operations
- `prisma` - Prisma CLI for schema management

## Database Schema

The Prisma schema (`prisma/schema.prisma`) includes:

- **Person** - User/participant information
- **Bill** - Bill records with status tracking
- **BillItem** - Individual items on bills
- **PercentageSurcharge** - Percentage-based surcharges
- **BillParticipant** - Junction table for bill participants
- **BillItemAssignment** - Junction table for item assignments

## Available Scripts

```bash
# Generate Prisma client after schema changes
pnpm run db:generate

# Push schema changes to database (development)
pnpm run db:push

# Pull schema from existing database
pnpm run db:pull

# Open Prisma Studio (database GUI)
pnpm run db:studio

# Reset database (careful!)
pnpm run db:reset
```

## Setup Instructions

1. **Start your database** (Supabase local or remote):
   ```bash
   # For local development
   supabase start
   ```

2. **Configure environment variables**:
   ```bash
   # .env file should contain:
   DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
   ```

3. **Push schema to database**:
   ```bash
   pnpm run db:push
   ```

4. **Generate Prisma client**:
   ```bash
   pnpm run db:generate
   ```

## Migration from Raw SQL

### Before (Raw SQL via Supabase)
```javascript
const { data: bill, error } = await supabase
  .from('bills')
  .insert({
    name: input.name,
    date: input.date,
    amount: 0,
    status: 'draft',
  })
  .select()
  .single();
```

### After (Prisma)
```javascript
const bill = await ctx.prisma.bill.create({
  data: {
    name: input.name,
    date: new Date(input.date),
    amount: new Decimal(0),
    status: 'draft',
  },
});
```

## Key Benefits

1. **Type Safety** - Full TypeScript support with generated types
2. **Better Developer Experience** - IntelliSense, auto-completion
3. **Schema Management** - Version-controlled database schema
4. **Query Builder** - Intuitive API for complex queries
5. **Migrations** - Proper database versioning (when ready)

## Troubleshooting

### Database Connection Issues
- Ensure Supabase is running: `supabase start`
- Check DATABASE_URL in `.env` file
- Verify database credentials

### Schema Sync Issues
- Run `pnpm run db:push` to sync schema
- Use `pnpm run db:pull` to pull from existing database
- Check for schema conflicts

### Type Issues
- Run `pnpm run db:generate` after schema changes
- Restart TypeScript server in your editor
- Clear Next.js cache: `rm -rf .next`

## Next Steps

1. **Test the integration** with your local Supabase instance
2. **Update frontend components** to use new Prisma types
3. **Add more advanced queries** as needed
4. **Set up proper migrations** for production deployment
5. **Remove old migration files** once everything is working

## Legacy Support

The old types are still available as `LegacyBill`, `LegacyBillItem`, etc. for gradual migration of frontend components.
