import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class QueueService {

    protected apiServerPaths = environment.backendServer.paths;

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    queues(params: any) {
        const path = this.apiServerPaths.queue.api.queues;
        const options: any = {
            params: {
                encryptParam: false
            },
            headers: {
                Accept: 'application/json'
            }
        };

        for (const key in params) {
            options.params[key] = params[key];
        }

        console.log(options)

        return this.backendService.get(path, options, map((result: any) => {
            return {
                queues: result?.queues || [],
                count: result?.queues.length
            };
        }));
    }

    clean(params: any) {
        const queueName = params?.queueName || null;
        const status = params?.status || null;

        const path = this.apiServerPaths.queue.api.clean.replace('{QUEUE_NAME}', queueName)
                                            .replace('{STATUS}', status);
        const options: any = {
            params: {
                encryptParam: false
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.put(path, options, map((result: any) => {
            return {
                status: true
            };
        }));
    }

    cleanJob(params: any) {
        const queueName = params?.queueName || null;
        const jobId = params?.jobId || null;

        const path = this.apiServerPaths.queue.api.cleanJob.replace('{QUEUE_NAME}', queueName)
                                        .replace('{JOB_ID}', jobId);
        const options: any = {
            params: {
                encryptParam: false
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.put(path, options, map((result: any) => {
            return {
                status: true
            };
        }));
    }

    retryJob(params: any) {
        const queueName = params?.queueName || null;
        const jobId = params?.jobId || null;

        const path = this.apiServerPaths.queue.api.retryJob.replace('{QUEUE_NAME}', queueName)
                                                        .replace('{JOB_ID}', jobId);
        const options: any = {
            params: {
                encryptParam: false
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.put(path, options, map((result: any) => {
            return {
                status: true
            };
        }));
    }

    retryAll(params: any) {
        const queueName = params?.queueName || null;

        const path = this.apiServerPaths.queue.api.retryAll.replace('{QUEUE_NAME}', queueName);
        const options: any = {
            params: {
                encryptParam: false
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.put(path, options, map((result: any) => {
            return {
                status: true
            };
        }));
    }
}
