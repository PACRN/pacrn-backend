CREATE OR REPLACE FUNCTION get_distance_from_lat_lon_km(
    lat1 FLOAT,
    lon1 FLOAT,
    lat2 FLOAT,
    lon2 FLOAT
) RETURNS FLOAT AS $$
DECLARE
    R FLOAT := 6371;  -- Radius of the Earth in kilometers
    dLat FLOAT;
    dLon FLOAT;
    a FLOAT;
    c FLOAT;
BEGIN
    -- Convert degrees to radians
    dLat := RADIANS(lat2 - lat1);
    dLon := RADIANS(lon2 - lon1);

    -- Haversine formula
    a := SIN(dLat / 2) * SIN(dLat / 2) +
         COS(RADIANS(lat1)) * COS(RADIANS(lat2)) *
         SIN(dLon / 2) * SIN(dLon / 2);
    c := 2 * ATAN2(SQRT(a), SQRT(1 - a));

    -- Calculate distance
    RETURN R * c;
END;
$$ LANGUAGE plpgsql;