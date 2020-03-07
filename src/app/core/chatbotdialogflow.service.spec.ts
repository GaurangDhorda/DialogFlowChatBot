import { TestBed } from '@angular/core/testing';

import { ChatbotdialogflowService } from './chatbotdialogflow.service';

describe('ChatbotdialogflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatbotdialogflowService = TestBed.get(ChatbotdialogflowService);
    expect(service).toBeTruthy();
  });
});
