# Source Data for Example Application Suite

To generate a more meaningful example, public data was downloaded from the US
Federal Data Catalog [https://catalog.data.gov/] to explore and intersect,
leveraging the various fable and pict capabilities.

Each capability is exercised separately to demonstrate isolated features
that can be composed in different ways.

## Features demonstrated:

* data ingestion (meadow-integration, bibliograph, pict)
* high volume data transformation (meadow-integration, bibliograph, pict)
* SQL data storage (meadow-integration, meadow-endpoints, meadow)
* api-based data serving (meadow-endpoints)
* dashboarding and record presentation (pict-section-recordset)

Each of these features are expressed through configuration as much as possible.

## Data Sets Represented

By filtering the federal data catalog to Seattle ArcGIS data ([https://catalog.data.gov/dataset/?_publisher_limit=0&publisher=City+of+Seattle+ArcGIS+Online](link),
we downloaded the following data sets (all from the 2023 census):

## Housing Characteristics

[https://catalog.data.gov/dataset/housing-characteristics-seattle-neighborhoods]

Table from the American Community Survey (ACS) 5-year series on housing characteristics related topics for City of Seattle Council Districts, Comprehensive Plan Growth Areas and Community Reporting Areas. Table includes B25002 Occupancy Status, B24042 Tenure by Number of Bedrooms, B25024 Units in Structure, B25014 Tenure by Occupants per Room, B25040 House Heating Fuel, B25049 Tenure by Plumbing Facilities, B25053 Tenure by Kitchen Facilities, B25043 Tenure by Telephone Service Available by Age of Householder, B28003 Presence of a Computer and Type of Internet in Household. Data is pulled from block group tables for the most recent ACS vintage and summarized to the neighborhoods based on block group assignment. Table created for and used in the Neighborhood Profiles application.

## Housing Costs

[https://catalog.data.gov/dataset/housing-tenure-and-costs-seattle-neighborhoods]

Table from the American Community Survey (ACS) 5-year series on housing tenure and cost related topics for City of Seattle Council Districts, Comprehensive Plan Growth Areas and Community Reporting Areas. Table includes B25003 Tenure of Occupied Housing Units, B25070 Gross Rent as a Percentage of Household Income in the Past 12 Months, B25063 Gross Rent, B25091 Mortgage Status by Selected Monthly Owner Costs as a Percentage of Household Income in the Past 12 Months, B25087 Mortgage Stauts and Selected Monthly Owner Costs, B25064 Median Gross Rent, B25088 Median Selected Monthly Owner Costs by Mortgage Status. Data is pulled from block group tables for the most recent ACS vintage and summarized to the neighborhoods based on block group assignment.Table created for and used in the Neighborhood Profiles application.

## Race and Ethnicity

[https://catalog.data.gov/dataset/race-and-ethnicity-seattle-neighborhoods]

Table from the American Community Survey (ACS) 5-year series on race and ethnicity related topics for City of Seattle Council Districts, Comprehensive Plan Growth Areas and Community Reporting Areas. Table includes B03002 Hispanic or Latino Origin by Race, B02008-B02013 Race Alone or in Combination with One or More. Data is pulled from block group tables for the most recent ACS vintage and summarized to the neighborhoods based on block group assignment.Table created for and used in the Neighborhood Profiles application.