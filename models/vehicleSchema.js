const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0.0
        },
        description: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Used',
                    'Certified Used',
                    'Brand New',
                    'Other'
                ]
            }
        },
        year: {
            type: String,
            required: true,
            enum: {
                values: [
                    '2022',
                    '2021',
                    '2020',
                    '2019',
                    '2018',
                    '2017',
                    '2016',
                    '2015',
                    '2014',
                    '2013',
                    '2012',
                    '2011',
                    '2010',
                    '2009',
                    '2008',
                    '2007',
                    '2006',
                    '2005',
                    '2004',
                    '2003',
                    '2002',
                    '2001',
                    '2000',
                    '1999',
                    '1998',
                    '1997',
                    '1996',
                    '1995',
                    '1994',
                    '1993',
                    '1992',
                    '1991',
                    '1990',
                    '1989',
                    '1988',
                    '1987',
                    '1986',
                    '1985',
                    '1984',
                    '1983',
                    '1982',
                    '1981',
                    '1980',
                    '1979',
                    '1978',
                    '1977',
                    '1976',
                    '1975',
                    '1974',
                    '1973',
                    '1972',
                    '1971',
                    '1970',
                    '1969',
                    '1968',
                    '1967',
                    '1966',
                    '1965'
                ]
            }
        },
        body: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Hatch Back',
                    'Sedan',
                    'SUV',
                    'Other'
                ]
            }
        },
        mileage: {
            type: Number,
            required: true
        },
        fuel: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Petrol',
                    'Diesel',
                    'Hybrid',
                    'Other'
                ]
            }
        },
        transmission: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Auto',
                    'Manual'
                ]
            }
        },
        color: {
            type: String,
            require: true
        },
        drive: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Left Hand',
                    'Right Hand'
                ]
            }
        },
        model: {
            type: String,
            required: true,
            enum: {
                values: [
                    'FWD',
                    'RWD',
                    '4WD',
                    'AWD',
                    'Other'
                ]
            }
        },
        make: {
            type: String,
            required: true,
            enum: {
                values: [
                    'Audi', 
                    'BMW',
                    'Flat',
                    'Ford',
                    'Honda',
                    'Mercedez',
                    'Chevrolet',
                    'Hyundai',
                    'Isuzu',
                    'Jeep',
                    'Kia',
                    'Land Rover',
                    'Mahindra',
                    'Maserati',
                    'Mazda',
                    'Mini',
                    'Nissan',
                    'Porsche',
                    'Suzuki',
                    'Number',
                    'Toyota',
                    'VW',
                    'VW GTI'
                ]
            }
        },
        images: [String],
    },
    {
        timestamps: true,
    }
)
const Vehicle = mongoose.model('vehicles', vehicleSchema);

module.exports = Vehicle;