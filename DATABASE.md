<!-- aggregate destination -->

CREATE OR REPLACE VIEW "public"."stops_inbound_qty_2019" AS
SELECT translink2019.origin_stop,
translink2019.month,
translink2019."time",
sum(translink2019.quantity) AS sum
FROM translink2019
GROUP BY translink2019.origin_stop, translink2019.month, translink2019."time";

query stops_inbound_qty_2019($stopID:String){
  stops_inbound_qty_2019(where:{origin_stop:{_eq:$stopID}}){
origin_stop
month
time
sum
}
}
