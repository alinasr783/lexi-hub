-- Update admins table to use plaintext password instead of hash
ALTER TABLE public.admins 
DROP COLUMN password_hash,
ADD COLUMN password text NOT NULL DEFAULT '';