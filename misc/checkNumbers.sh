var=0
for i in $(seq 1 130)
do
	store=`curl -s "http://www.ctabustracker.com/bustime/api/v2/getroutes?key=Ph2VjWCh3hRRKyqERyPYdYLjs&format=json" | jq '."bustime-response".routes['$i'].rt' | tr -d '"'` 
	var="$var,$store"

done
echo $var
