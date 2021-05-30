import RefuelHistory from "../../../../backend/api/src/components/refuel_history/refuel-history.model";
import api from "../Api/Api";

export default class RefuelHistoryService {
    public static getRefuelHistoryByVehicleId(vehicleId: number): Promise<RefuelHistory[]> {
        return new Promise<RefuelHistory[]>(resolve => {
            api(
                "get",
                "/vehicle/" + vehicleId + "/history",
                "user"
            )
                .then(res => {
                    if (res?.status !== 'ok') {
                        // emit event
                        return resolve([]);
                    }
                    resolve(res.data as RefuelHistory[])
                })
        })
    }
}