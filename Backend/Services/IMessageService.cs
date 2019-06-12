using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IMessageService
    {
        Task<List<Message>> GetMessagesAsync();
        Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, Message message);
    }
}