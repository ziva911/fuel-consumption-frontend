import VehicleModel from "../../../../backend/api/src/components/vehicle/vehicle.model";
import api from "../Api/Api";
import EventRegistry from '../Api/EventRegistry';

export default class VehicleService {
    public static getAllVehicles(): Promise<VehicleModel[]> {
        return new Promise<VehicleModel[]>(resolve => {
            api("get", "/vehicle", "user")
                .then(res => {
                    if (res?.status !== 'ok') {
                        if (res.status === 'login') {
                            EventRegistry.emit("AUTH_EVENT", "force_login")
                        }
                        return resolve([]);
                    }
                    resolve(res.data as VehicleModel[])
                })
        })
    }

    public static getVehicleById(vehicleId: number): Promise<VehicleModel | null> {
        return new Promise<VehicleModel | null>(resolve => {
            api("get", `/vehicle/${vehicleId}`, "user")
                .then(res => {
                    if (res?.status !== 'ok') {
                        if (res.status === 'login') {
                            EventRegistry.emit("AUTH_EVENT", "force_login")
                        }
                        return resolve(null);
                    }
                    resolve(res.data as VehicleModel);
                })
        })
    }
}