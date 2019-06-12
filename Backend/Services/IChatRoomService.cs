using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IChatRoomService
    {
        Task<List<ChatRoom>> GetChatRoomsAsync();
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);
    }
}