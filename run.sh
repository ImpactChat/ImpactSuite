start_time=`date +%s`
docker-compose build

end_time=`date +%s`
echo execution time was `expr $end_time - $start_time` s.

## docker system prune -a