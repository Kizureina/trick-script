counter=1
for file in *.CHS.ass; do
    mv "$file" "[LoliHouse] Bang Dream! 2nd Season - $(printf "%02d" $counter) [BDRip 1080p HEVC-10bit FLAC].ass"
    counter=$((counter+1))
done

