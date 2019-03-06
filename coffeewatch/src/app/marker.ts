export interface LabelOptions {
    color: string;
    fontSize: '14px';
    fontWeight: 'bold';
    text: string;
}

interface Icon
{
    url: string;
    scaledSize: {height: number, width: number};
}

export class Marker
{
    id: number;
    lat: number;
    lng: number;
    color: string;
    name: string;
    icon: Icon;
    labelOptions: LabelOptions = undefined;
}

export const MarkerColors = ['#f90000','#e7ef00','#f4bb00','#00f953'];
