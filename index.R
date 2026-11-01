# Haamu Corporation - webR auditing and statistics
haamu_audit <- function(events = numeric(), classes = 0L, functions = 0L) {
  list(timestamp = as.character(Sys.time()),
       events = length(events),
       classes = as.integer(classes),
       functions = as.integer(functions),
       event_mean = if (length(events)) mean(events) else 0)
}
