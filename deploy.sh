echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@103.200.20.221:/var/www/html/
echo "Done!"