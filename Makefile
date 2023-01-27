run:
	cd frontend && npx parcel build index.html
	deno run --allow-net --allow-read server.ts

	