import RefuelHistory from "../../../../backend/api/src/components/refuel_history/refuel-history.model";
import api from "../Api/Api";
import EventRegistry from "../Api/EventRegistry";

export default class RefuelHistoryService {
    public static getRefuelHistoryByVehicleId(vehicleId: number): Promise<RefuelHistory[]> {
        return new Promise<RefuelHistory[]>(resolve => {
            api("get", `/vehicle/${vehicleId}/history`, "user")
                .then(res => {
                    if (res?.status !== 'ok') {
                        if (res.status === 'login') {
                            EventRegistry.emit("AUTH_EVENT", "force_login")
                        }
                        return resolve([]);
                    }
                    resolve(res.data as RefuelHistory[])
                })
        })
    }
}