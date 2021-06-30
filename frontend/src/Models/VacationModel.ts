class VacationModel {
    public vacationId: number;
    public destination: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public description: string;
    public photoPath: string;
    public image: FileList;

    public static convertToFormData(vacation: VacationModel): FormData {
        const myFormData = new FormData();
    
        myFormData.append("destination", vacation.destination);
        myFormData.append("checkIn", vacation.checkIn.toString());
        myFormData.append("checkOut", vacation.checkOut.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("image", vacation.image.item(0));

        return myFormData;
    }
}

export default VacationModel;