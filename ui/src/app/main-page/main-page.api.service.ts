import { RequestHandler } from '../core/api/request-handler';
import { LinkModel } from '../../../models/generated/link.model';
import { Observable } from 'rxjs';
import { CreateLinkModel } from '../../../models/generated/create-link.model';

export class MainPageApiService extends RequestHandler {
	public requestAnonymousNewShortLink(linkModel: LinkModel): Observable<LinkModel> {
		return this.httpPost<LinkModel>('/Link/CreateAnonymousLink', linkModel);
	}

	public getOriginalLink(linkModel: LinkModel): Observable<LinkModel> {
		return this.httpPost<LinkModel>('/Link/GetLink', linkModel);
	}

	public requestUserNewShortLink(linkModel: CreateLinkModel): Observable<LinkModel> {
		return this.httpPut<LinkModel>('/Link/CreateUserLink', linkModel);
	}
}
