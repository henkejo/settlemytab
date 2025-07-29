CREATE POLICY "Anyone can create bills"
ON bills
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can view bills"
ON bills
FOR SELECT
TO public
USING (true);
