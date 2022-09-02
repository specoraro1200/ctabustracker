while read p; do
        # | grep -A2 -E -m 1 '<div class="wsod_twoCol clearfix">'`
        website=`curl -s -N https://www.transitchicago.com/bus/$p/` 
        # if [[ "$website" == *"no forecast data"* ]]; then
        #         echo "It's there."
        #         continue
        # fi
        #echo $website
        annalyst=`echo $website | sed -e 's/.*interior-main-banner\(.*\)CT_Main_0_imgBusRouteHeader.*/\1/'`
        echo $annalyst $p
        # echo $p $median "here" $low $high $percentage $lastPrice $annalyst
        # psql -t -U "sal" -A -d 'project' -c "insert into data (ticker,high,low,median,percentage,lastprice,annalyst,date,rating) values ('$p',$high,$low,$median,'$percentage',$lastPrice,$annalyst,CURRENT_DATE,'$rating');"
#store=$(date +%F)

done <text.txt
